'use client'

import { PRODUCT_CATEGORIES } from "@/config"
import useCloseNavPanel from "@/hooks/useCloseNavPanel"
import Link from "next/link"
import { useRef } from "react"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import NavItem from "./NavItem"
import { buttonVariants } from "./ui/button"
import Cart from "./Cart"

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null)
  const user = null

  useCloseNavPanel(headerRef)

  return (
    <header ref={headerRef} className="sticky z-10">
      <MaxWidthWrapper className="border-b border-gray-100 flex py-4">
        <Link className="mr-8" href={'/'}>
          <Icons.logo className="h-10 w-10" />
        </Link>
        <div className="hidden md:flex justify-between grow">
          <div className="flex gap-8">
            {PRODUCT_CATEGORIES.map((category) => (
              <NavItem key={category.value} category={category} />
            ))}
          </div>
          <div className="flex gap-4">
            {user ? null : (
             <>
              <Link href={'/login'} className={buttonVariants({variant: "ghost" })}>
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
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

export default Header