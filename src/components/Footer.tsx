'use client'

import Link from "next/link"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"

function Footer() {
  const pathName = usePathname()
  const toMinimize = ['/sign-up', '/sign-in','/verify-email']
  return (
    <footer className="flex flex-col gap-10 pt-16 pb-10 border-t ">
      {!toMinimize.includes(pathName) && <LogoAndCTA />}
      <MaxWidthWrapper className="flex flex-wrap gap-4 justify-center items-center sm:justify-between text-sm text-muted-foreground">
        <p className="">	&#169; 2024 All Rights Reserved</p>
        <div className="flex flex-wrap justify-center">
          <Link href={'#'} className={buttonVariants({variant: "link"})}> Terms</Link>
          <Link href={'#'} className={buttonVariants({variant: "link"})}> Privacy Policy</Link>
          <Link href={'#'} className={buttonVariants({variant: "link"})}> Cookie Policy</Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

const LogoAndCTA = () => {
  return(
    <>
      <div className="flex justify-center" aria-hidden={true} >
        <Icons.logo className="h-12 w-auto" /> 
      </div>
      <div className="py-8 flex flex-col items-center bg-zinc-50 ">
        <h3 className='font-semibold text-gray-900'>
          Become a seller
        </h3>
        <p className='mt-2 text-sm text-muted-foreground max-w-sm text-center'>
          If you&apos;d like to sell high-quality digital products, you can do so in minutes.{' '}
          <Link 
            className='whitespace-nowrap font-medium text-black hover:text-zinc-900'
            href={'/sign-up?as=seller'}
          > 
            Get started &rarr; 
          </Link>
        </p>
      </div>
    </>
  )
}

export default Footer