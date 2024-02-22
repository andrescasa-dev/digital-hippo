import express from 'express'
import { stripe } from './lib/stripe';
import type Stripe from 'stripe';
import { WebhookRequest } from './server';
import { getPayloadClient } from './get-payloadClient';

export const stripeWebhookHandler = async (req: express.Request, res: express.Response) => {
  const webhookRequest = req as any as WebhookRequest
  const body = webhookRequest.rawBody
  const signature = req.headers['stripe-signature'] || ''
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_63bf016bebaae25e15ed5f11f11bb825ced37306ad17c6d3bb93022528e97ee0'
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
      depth: 0
    })

    const [order] = orders
    // check the existence of the order
    if(!order) {
      console.error('Stripe Webhook error: no such order')
      return res.status(404).send('Stripe Webhook error: no such order')
    }

    // only the owner can lunch a event to modify his order.
    console.log("order.user:",order.user)
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
  }
  else{
    console.log('the stripe action is not being handle')
    // return res.status(400).send('invalid stripe action')
  }
  return res.status(200).send()
}