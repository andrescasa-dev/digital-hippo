'use client'

import { Button } from "@/components/ui/button";
import { FEE } from "@/config";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice, getCategoryLabel, getValidImageUrls } from "@/lib/utils";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const {items: products} = useCart()
  const subtotal = products.reduce((total, {price}) => total + price, 0)
  const total = subtotal + FEE
  const router = useRouter()
  const {mutate: createStripeSession, isLoading} = trpc.payment.createSession.useMutation({
    onSuccess: ({ url })=>{
      if(url){
        router.push(url)
      }
    }
  })

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-12">Shopping Cart</h1>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-x-16">
        <section className="flex flex-col">
          {products.length === 0 
            ? <EmptyCart />
            : products.map((product, i, {length}) => (
              <CartPageItem key={product.id} product={product} i={i} length={length} />
            ))
          }
        </section>
        <section className="flex flex-col gap-4 rounded-lg bg-gray-50 mt-16 lg:mt-0 px-4 py-6 sm:p-6 lg:p-8 self-start">
          <h2 className="text-lg font-medium text-gray-900 mb-2 ">
            Order summary
          </h2>
          <div className="flex justify-between capitalize text-sm">
            <span className="text-sm text-muted-foreground">
              subtotal
            </span>
            <span className="text-gray-900 font-medium">
              {formatPrice(subtotal)}
            </span>  
          </div>
          <div className="flex justify-between capitalize text-sm pt-4 border-t border-gray-200">
            <span className="text-muted-foreground">
              flat transaction fee
            </span>
            <span className="text-gray-900 font-medium">
              {formatPrice(FEE)}
            </span>  
          </div>
          <div className="flex justify-between text-base font-medium capitalize text-gray-900 pt-4 border-t border-gray-200 mb-2">
            <span>order total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button 
            size={'lg'} 
            disabled={(products.length === 0) ||  isLoading} 
            onClick={() => createStripeSession({ ids: products.map(product => product.id)})}>
            Checkout
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin ml-1.5"/> : null}
          </Button>
        </section>
      </div>
    </div>
  )
}

function EmptyCart (){
  return (
    <div className="p-12 border-dashed border-zinc-200 border-2 rounded-lg text-center flex flex-col items-center gap-1"> 
      <Image 
        src={'/hippo-empty-cart.png'} 
        alt="hippo with a empty supermarket cart" 
        height={160} 
        width={160}
      />
      <h1 className="font-semibold text-2xl text-gray-900">
        Your cart is empty
      </h1>
      <p className="text-base text-muted-foreground">
        Whoops! Nothing to show here yet.
      </p>
    </div>
  )
}

function CartPageItem({product, i, length}: {product: Product, i: number, length: number}) {
  const {product_name, price} = product
  const imageUrl = getValidImageUrls(product)[0]
  return (
    <article className={cn("flex gap-x-6 py-10 border-gray-200 border-t capitalize", {"border-gray-200 border-b": i === length-1})}>
      <Image 
        className="bg-gray-100 rounded-md object-cover object-center" 
        src={imageUrl} 
        alt="product image" 
        height={100} width={100}  
      />
      <div className="text-sm flex flex-col gap-1">
        <h3 className="font-medium">
          <Link 
            className="text-gray-700 hover:text-gray-900" 
            href={`/product/productId`} 
          >
            {product_name}
          </Link>
        </h3>
        <p className="text-muted-foreground">Category: {getCategoryLabel(product.category)}</p>
        <p className="font-medium ">{formatPrice(price)}</p>
        <p className="te-gray-700 flex mt-4 gap-1"> 
          <Check 
            aria-hidden='true'
            className="text-green-500"
          />
          <span>Eligible for instant delivery</span>
        </p>
      </div>
      <Button variant={"ghost"} aria-label="remove product from cart" className="ml-auto mb-auto justify-center">
        <X className=" h-4 w-4 text-gray-900" aria-hidden='true'/>
      </Button>
    </article>
  )
}