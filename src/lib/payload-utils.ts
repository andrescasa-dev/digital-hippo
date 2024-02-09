import { User } from "../payload-types"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { Access } from "payload/config"
import { BeforeChangeHook, TypeWithID } from "payload/dist/collections/config/types"

export const getServerSideUser = async (cookies: NextRequest['cookies'] | ReadonlyRequestCookies) => {
  const token = cookies.get('payload-token')?.value
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  )
  const {user} = (await response.json()) as {user:User| null} 
  return { user }
}

export const addUserHook : BeforeChangeHook = async ({req, data}) => {
  return {...data, user: req.user.id}
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
