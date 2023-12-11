'use client'

import useCloseNavPanel from "@/hooks/useCloseNavPanel"
import Link from "next/link"
import { PropsWithChildren, useRef } from "react"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Header = ({children} : PropsWithChildren) => {
  const headerRef = useRef<HTMLElement | null>(null)

  useCloseNavPanel(headerRef)

  return (
    <header ref={headerRef} className="sticky z-10">
      <MaxWidthWrapper className="border-b border-gray-100 flex py-4">
        <Link className="mr-8" href={'/'}>
          <Icons.logo className="h-10 w-10" />
        </Link>
        {children}
      </MaxWidthWrapper>
    </header>
  )
}

export default Header