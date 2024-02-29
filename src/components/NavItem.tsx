'use client'

import { ChevronDown } from 'lucide-react';
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import useCloseNavPanel from '@/hooks/useCloseNavPanel';

type Category = (typeof PRODUCT_CATEGORIES)[number]

const NavItem = ({category} : {category: Category}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const currentTab = params.get('tab')
  const closeNavPanel = useCloseNavPanel()
  const handleClick = () => {
    currentTab !== category.value 
      ? params.set('tab', category.value)
      : params.delete('tab')
    router.replace(`${pathname}?${params}`)
  }

  return (
    <>
      <Button
        key={category.value}
        className='flex gap-1'
        variant={'ghost'}
        onClick={handleClick}
        aria-roledescription={`open navigation panel of ${category.name}`}
      >
        {category.name}
        <ChevronDown 
          aria-hidden={true}
          className={cn(
            "h-4 w-4 text-muted-foreground transition-all",
            {"-rotate-180": currentTab === category.value}
          )} 
        />
      </Button>
      {currentTab === category.value && (
        <div className='absolute inset-0 top-full h-fit p-10 grid gap-6 grid-cols-[repeat(auto-fit,minmax(0px,1fr))] bg-gray-100'>
          {category.items.map((item, i) => (
            <Link  href={item.href} key={i} className='flex flex-col gap-3'>
              <button onClick={()=> closeNavPanel()} className='relative aspect-video bg-gray-200'>
                <Image
                  fill
                  className='object-cover object-center rounded-md'
                  src={item.imageSrc}
                  alt={`Image of ${item.name}`}
                />
              </button>
              <p className='font-medium text-gray-900'>{item.name}</p>
              <p className='text-muted-foreground -mt-2' aria-hidden='true'>shop now</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}



export default NavItem