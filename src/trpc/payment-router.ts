
import { privateProcedure, router } from "./trpc";
import { sessionValidator } from "../lib/validators/session-validator";
import { stripe } from "../lib/stripe";
import { TRPCError } from "@trpc/server";
import payload from "payload";

export const paymentRouter = router({
  createSession: privateProcedure
  .input(sessionValidator)
  .mutation(async ({ctx, input})=>{
    const user = ctx.user
    const productIds = input.ids

    if(productIds.length === 0){
      throw new TRPCError({code: "BAD_REQUEST", message: "empty array productIds"})
    }

    const {docs: products} = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: productIds
        }
      }
    })

    const validProducts = products.filter(product => Boolean(product.priceId))

    const order = await payload.create({
      collection: 'orders',
      data: {
        _isPayed: false,
        products: validProducts.map(product => product.id),
        user: user.id
      }
    })

    const lineItems = validProducts.map(product => (
      {
        price: product.priceId!,
        quantity: 1
      }
    ))
    
    lineItems.push({
      price: "price_1OjOW9GxTybJEEuURMUIOkCm",
      quantity: 1
    })

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
        payment_method_types: ['card'],
        mode: 'payment',
        metadata: {
          userId: user.id,
          orderId: order.id,
        },
        line_items: lineItems,
      });
      
      return {
        url: session.url
      }
    } catch (error) {
      throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', message:`Error while creating session in stripe, Error: ${error}`})
    }

  })
})