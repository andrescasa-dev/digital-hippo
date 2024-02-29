'use client'

import useCloseNavPanel from "@/hooks/useCloseNavPanel"
import Link from "next/link"
import { PropsWithChildren, useRef } from "react"
import Cart from "./Cart"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Header = ({children} : PropsWithChildren) => {
  const headerRef = useRef<HTMLElement | null>(null)

  useCloseNavPanel(headerRef)

  return (
    <header ref={headerRef} className="sticky top-0 bg-white z-10">
      <MaxWidthWrapper>
        <div className="border-b border-gray-100 flex py-4 justify-between gap-2">
          <Link className="mr-8" href={'/'}>
            <Icons.logo className="h-10 w-10" />
          </Link>
          {children}
          <Cart className="sm:hidden ml-auto" />
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

export default Header