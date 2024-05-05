'use client'

import Link from "next/link"
import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Footer() {
  const pathName = usePathname()
  const toMinimize = ['/sign-up', '/sign-in','/verify-email']
  return (
    <footer className="flex flex-col gap-10 pt-16 pb-10 border-t ">
      {!toMinimize.includes(pathName) && <LogoAndCTA />}
      <MaxWidthWrapper className="flex flex-wrap gap-4 justify-center items-center lg:justify-between text-sm text-muted-foreground">
      <p>	Made By Andr&eacute;s Castellanos With Passion &#9829;</p>
      <p>	&#169; 2024 All Rights Reserved</p>
        
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
        <h2 className='text-2xl font-semibold text-gray-900'>
          Become a seller
        </h2>
        <p className='mt-2 text-sm text-muted-foreground max-w-sm text-center'>
          If you&apos;d like to sell high-quality digital products, you can do so in minutes.{' '}
          <Link 
            className={cn(buttonVariants({variant: 'link'}),'whitespace-nowrap font-medium inline-flex gap-0 py-0 p-1 items-center')}
            href={'/sign-in?as=seller'}
          > 
            Get started <ArrowRight aria-hidden={true} className="w-4 h-3"/> 
          </Link>
        </p>
      </div>
    </>
  )
}

export default Footer