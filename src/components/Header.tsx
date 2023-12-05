'use client'

import Link from "next/link"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { useEffect, useRef } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { PRODUCT_CATEGORIES } from "@/config"
import NavItem from "./NavItem"
import { buttonVariants } from "./ui/button"

const Header = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)

  const closeNav = () =>{
    const params = new URLSearchParams(searchParams)
    if(params.get('category')){
      params.delete('category')
      router.replace(`${pathname}?${params}`)
    }
  }

  useOnClickOutside(headerRef, () => closeNav())

  useEffect(()=>{
    const closeHandler = (e: KeyboardEvent) =>{
      if(e.key === 'Escape'){
        closeNav()
      }
    }
    document.addEventListener('keydown',closeHandler)
    return () => {
      document.removeEventListener('keydown',closeHandler)
    }
  },[])

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
          <div className="flex gap-8">
            <Link href={'/login'} className={buttonVariants({variant: "ghost" })}>
              Sign in
            </Link>
            <Link href={'/sign-up'} className={buttonVariants({variant: "ghost" })}>
              Create Account
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

export default Header