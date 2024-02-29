'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from './ui/sheet'

function HamburgerNav({UserAccountHamburger}: {UserAccountHamburger:ReactNode}) {
  return (
    <Sheet>
      <SheetTrigger className='sm:hidden -order-1'>
        <Menu className='w-5 h-5' />
      </SheetTrigger>
      <SheetContent className='w-full text-gray-900' side={'left'}>
        <ScrollArea className='flex flex-col h-[80%] overflow-auto my-4'>
          {PRODUCT_CATEGORIES.map(({name, items}) => (
           <div key={crypto.randomUUID()}>
              <h2 className='border-gray-200 border-b whitespace-nowrap py-4 mb-4 text-base font-medium'>
                {name}
              </h2>
              <ul className='grid grid-cols-2 gap-y-10 gap-x-4'>
                {items.map(catItem => (
                  <li key={crypto.randomUUID()}>
                    <SheetClose asChild>
                      <Link 
                        className='w-full'
                        href={catItem.href}>
                        <div className='aspect-square relative rounded-md border border-gray-200'>
                          <Image
                            className=' object-cover object-center'
                            fill
                            src={catItem.imageSrc}
                            alt={catItem.name}
                          />
                        </div>
                        <h3 className='mt-3 font-medium text-sm'>
                          {catItem.name}
                        </h3>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
           </div>
          ))}
        </ScrollArea>
        <SheetFooter className='border-t border-gray-200 py-6 flex flex-col gap-4'>
          {UserAccountHamburger}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default HamburgerNav