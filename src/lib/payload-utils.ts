import { Product, User } from "../payload-types"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { Access } from "payload/config"
import { BeforeChangeHook, TypeWithID } from "payload/dist/collections/config/types"
import { stripe } from "./stripe"

export const getServerSideUser = async (cookies: NextRequest['cookies'] | ReadonlyRequestCookies) => {
  try {
    const token = cookies.get('payload-token')?.value
    if (!token) return {user: null}
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: {
          Authorization: `JWT ${token}`,
        }
      },
    )
    if(!response.ok) {
      throw new Error('error in fetching request')
    }
    const {user} = (await response.json()) as {user:User| null} 
    return { user }
  } catch (error) {
    console.error('Error getting the user from payload: ' + error)
    return { user: null }
  }
}


export const isAdminOrOwner : Access = ({req}) => {
  if(!req.user ) return false
  const isAdmin = req.user.role === 'admin'
  if(isAdmin) return true
  return {
    user: {
      equals: req.user.id
    }
  }
}

export const isUnloggedFrontendUser : Access = ({req}) => {
  const referer = req.headers.referer
  return !req.user || !referer?.includes('sell')
}

export const addUserHook : BeforeChangeHook = async ({req, data}) => {
  return {...data, user: req.user.id}
}


export const createStripeProduct : BeforeChangeHook = async ({data, operation}) => {
  const {product_name, price} = data as Product
  let stripeProduct
  if (operation === 'create') {
    stripeProduct = await stripe.products.create({
      name: product_name,
      default_price_data:{
        currency: 'USD',
        unit_amount: Math.round(price * 100)
      }
    });
  }
  else{
    const {stripeId, priceId} = data as Product
    stripeProduct = await stripe.products.update(stripeId!, {
      name: product_name,
      default_price: priceId!
    })
  }

  return{
    ...data,
    priceId: stripeProduct.default_price as string,
    stripeId: stripeProduct.id
  }
}