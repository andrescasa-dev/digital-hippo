'use client'

import useCloseNavPanel from "@/hooks/useCloseNavPanel"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import Link from "next/link"
import { ReactNode, useEffect, useRef } from "react"
import Cart from "./Cart"
import HamburgerNav from "./HamburgerNav"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import NavBar from "./NavBar"

const Header = ({ UserAccountNavbar, UserAccountHamburger}: {UserAccountNavbar: ReactNode, UserAccountHamburger: ReactNode}) => {
  const headerRef = useRef<HTMLElement | null>(null)
  const closeNavPanel = useCloseNavPanel()
  useOnClickOutside(headerRef, () => closeNavPanel())  

  return (
    <header ref={headerRef} className="sticky top-0 bg-white z-50">
      <MaxWidthWrapper>
        <div className="border-b border-gray-100 flex py-4 justify-between gap-2">
          <HamburgerNav UserAccountHamburger={UserAccountHamburger}/>
          <Link className="mr-8" href={'/'}>
            <Icons.logo className="h-10 w-10" />
          </Link>
          <NavBar UserAccountNavBar={UserAccountNavbar}/>
          <Cart className="sm:hidden ml-auto" />
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

export default Header