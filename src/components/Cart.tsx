'use client'

import { FEE } from "@/config"
import { useCart } from "@/hooks/useCart"
import { cn, formatPrice } from "@/lib/utils"
import { Loader2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import { buttonVariants } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

const Cart = ({className}: {className?:string}) => {
  const {items} = useCart()  
  const total = items.reduce((total, {price}) => total + price, 0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const EmptyCart = () => (
    <div className="flex flex-col h-full justify-center items-center gap-2">
      <Image
        className="bg-gray-100 rounded-md"
        src={'/hippo-empty-cart.png'} 
        width={200} 
        height={200} 
        alt="hippo with an empty cart"
      />
      <h2 className="font-medium text-xl">Your cart is empty</h2>
      <SheetTrigger asChild>
        <Link href={'/products'} className="text-blue-600 underline text-sm">
          Add items to your cart checkout
        </Link>
      </SheetTrigger>
    </div>
  )
  
  return (
      <Sheet>
        <SheetTrigger 
          aria-label="open cart"
          className={cn(
            buttonVariants({variant:'ghost'}),
            "flex group items-center gap-1", 
            className)} 
        >
            <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            {isMounted 
            ? <span className="w-4 h-4 font-medium text-gray-700 group-hover:text-gray-800 text-sm">
                {items.length}
              </span>
            : <Loader2 className="w-4 h-4 spin-in-1 animate-spin text-gray-400" />
            }
        </SheetTrigger>
        <SheetContent className="flex flex-col max-h-screen w-full">
          <SheetHeader>
            <SheetTitle className="flex gap-1 justify-center">
              Cart 
              <span>({items.length})</span>
            </SheetTitle>
          </SheetHeader>
          { items.length > 0 
            ? (<>
              <div className="flex flex-col h-[fit-content] overflow-hidden">
                <h3 className="py-4">Cart items</h3>
                <ScrollArea className="flex flex-col gap-4 h-[fit-content] overflow-auto">
                    {items.map(item => 
                      <CartItem 
                        key={item.id}
                        product={item} 
                      />
                    )}
                </ScrollArea>
                <section className="py-6 border-t border-gray-100 text-sm flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Shipping</span><span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction fee</span>
                    <span>{formatPrice(FEE)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{formatPrice(total + FEE)}</span>
                  </div>
                </section>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Link href={'/cart'} className={cn(buttonVariants(), 'w-full')}>
                    Continue to check out
                  </Link>
                </SheetClose>
              </SheetFooter>
            </>) 
            : <EmptyCart />
          }
        </SheetContent>
      </Sheet>
  )
}

export default Cart