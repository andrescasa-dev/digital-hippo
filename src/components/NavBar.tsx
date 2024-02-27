
import { PRODUCT_CATEGORIES } from "@/config"
import Link from "next/link"
import Cart from "./Cart"
import NavItem from "./NavItem"
import { buttonVariants } from "./ui/button"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from 'next/headers'
import NavDropdown from "./NavDropdown"

const NavBar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)  
  return (
    <nav className="hidden sm:flex justify-between grow">
      <div className="flex gap-8">
        {PRODUCT_CATEGORIES.map((category) => (
          <NavItem key={category.value} category={category} />
        ))}
      </div>
      <div className="flex gap-4">
        {user 
          ? (
            <NavDropdown user={user} />
          )
          : (
          <>
          <Link href={'/sign-in'} className={buttonVariants({variant: "ghost" })}>
            Sign in
          </Link>
          <span className="bg-gray-100 h-full w-px" aria-hidden={"true"} />
          <Link href={'/sign-up'} className={buttonVariants({variant: "ghost" })}>
            Create Account
          </Link>
          </> 
        )}
        <span className="bg-gray-100 h-full w-px" aria-hidden={"true"} />
        <Cart />
      </div>
    </nav>
  )
}

export default NavBar