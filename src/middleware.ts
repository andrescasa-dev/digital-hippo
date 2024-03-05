import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";


export async function middleware(req: NextRequest) {
  const {nextUrl, cookies} = req
  if(['/sign-in', '/sign-up'].includes(nextUrl.pathname)) {
    const { user } = await getServerSideUser(cookies)
    if(user){  
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
    }
  }
  return NextResponse.next()
}