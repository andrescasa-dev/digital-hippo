import { ShoppingCart } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { cn, formatPrice } from "@/lib/utils"
import Image from "next/image"

const Cart = () => {
  const items = 0
  const fee = 1

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
      <SheetTrigger className="flex group items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
        <span className="font-medium text-gray-700 group-hover:text-gray-800 text-sm">{items}</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-1 justify-center">
            Cart 
            <span>({items})</span>
          </SheetTitle>
        </SheetHeader>
        { items > 0 
          ? (<>
            <div>
              <h3 className="py-4">Cart items</h3>
              <div>
                {/* cart items */}
              </div>
              <section className="py-6 border-t border-gray-100 text-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Shipping</span><span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction fee</span><span>{formatPrice(fee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span><span>{formatPrice(fee)}</span>
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