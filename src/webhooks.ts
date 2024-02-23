import express from 'express';
import { Resend } from 'resend';
import type Stripe from 'stripe';
import { getPayloadClient } from './get-payloadClient';
import { stripe } from './lib/stripe';
import { WebhookRequest } from './server';
import { ReceiptEmailHtml } from './components/email/ReceiptEmailHtml';
import { Product } from './payload-types';
import { digitalHippoEmail } from './config';

const resend = new Resend(process.env.RESEND_API_KEY)

export const stripeWebhookHandler = async (req: express.Request, res: express.Response) => {
  const webhookRequest = req as any as WebhookRequest
  const body = webhookRequest.rawBody
  const signature = req.headers['stripe-signature'] || ''
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    console.error(`Webhook Error: ${
      err instanceof Error
        ? err.message
        : 'Unknown Error'
    }`)
    
    return res
      .status(400) 
      .send(
        `Webhook Error: ${
          err instanceof Error
            ? err.message
            : 'Unknown Error'
        }`
      )
  }

  // asure existence of metadata needed
  const session = event.data.object as Stripe.Checkout.Session
  session.metadata = {userId: '657b0952248ea1f0490b745d', orderId: '65cba19af370b99138e94630'}
  const userId = session?.metadata?.userId
  const orderId = session?.metadata?.orderId
  if(!userId || !orderId) {
    console.error('Stripe Webhook error: missed metadata needed')
    return res.status(400).send('Stripe Webhook error: missed metadata needed')
  }

  // update user order DB
  if(event.type === 'checkout.session.completed'){
    const payload = await getPayloadClient()
    // validate the identity of the order owner
    const {docs: users} = await payload.find({
      collection: 'users',
      where:{
        id:{
          equals: userId
        }
      }
    })
    const [user] = users
    if(!user) {
      console.error('Stripe Webhook error: invalid user')
      return res.status(401).send('Stripe Webhook error: invalid user')
    }

    // check the existence of the order
    // if an non-existing order is being modified it would be an error. 
    const {docs: orders} = await payload.find({
      collection: 'orders',
      where: {
        id:{
          equals: orderId
        }
      },
      depth: 2
    })

    const [order] = orders
    // check the existence of the order
    if(!order) {
      console.error('Stripe Webhook error: no such order')
      return res.status(404).send('Stripe Webhook error: no such order')
    }

    // only the owner can lunch a event to modify his order.
    const userOrderId = typeof order.user === 'string' ? order.user : order.user.id
    if(userOrderId !== userId ) {
      console.error('Stripe Webhook error: invalid user')
      return res.status(401).send('Stripe Webhook error: invalid user')
    }

    // i need the metadato in order to update the order
    payload.update({
      collection: 'orders',
      where: {
        id: {
          equals: orderId
        }
      },
      data: {
        _isPayed: true
      }
    })

    // send email receipt
    try {
      if(order.products.some(product => typeof product === 'string')){
        throw new Error('Invalid products: insufficient payload depth')
      }
      const products = order.products as Product[]
      const data = await resend.emails.send({
        from: digitalHippoEmail,
        to: [user.email],
        subject: 'Thanks for your order! This is your receipt.',
        html: ReceiptEmailHtml({email: user.email, products, date: new Date(), orderId})
      })
      
      if(data.error) throw new Error(data.error.message)
      
      console.log('Receipt email was send')
      res.status(200).json({ data })
    } catch (error) {
      console.error(`Could not send Receipt email, Error: ${error instanceof Error ? error.message : 'unknown Error'}` )
      res.status(500).json({ error })
    }
  }
  else{
    console.log('this stripe event is not being handle')
    // return res.status(400).send('invalid stripe action')
  }
  return res.status(200).send()
}