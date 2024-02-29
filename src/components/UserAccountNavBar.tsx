import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import NavDropdown from "./NavDropdown"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"

async function UserAccountNavBar() {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  return (
    user 
      ? (
        <NavDropdown 
          user={user} 
          className='px-8 border-r border-gray-200 mr-8'
        />
      )
      : (
      <>
        <Link 
          href={'/sign-in'} 
          className={cn(buttonVariants({variant: "ghost" }),'px-8 border-r border-gray-200')}>
          Sign in
        </Link>
        <Link 
          href={'/sign-up'} 
          className={cn(buttonVariants({variant: "ghost" }),'px-8 border-r border-gray-200 mr-8')}>
          Create Account
        </Link>
      </> 
    )
  )
}

export default UserAccountNavBar