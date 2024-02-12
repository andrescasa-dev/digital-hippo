import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function cart() {
  const products = Array(4).fill(undefined)
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-12">Shopping Cart</h1>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-x-16">
        <section className="flex flex-col">
          {products.map((product, i, {length}) => (
            <article key={i} className={cn("flex gap-x-6 py-10 border-gray-200 border-t", {"border-gray-200 border-b": i === length-1})}>
            <Image src={""} alt="product image" height={100} width={100} className="bg-gray-100 rounded-md" />
            <div className="text-sm flex flex-col gap-1">
              <h3 className="font-medium">
                <Link 
                  className="text-gray-700 hover:text-gray-900" 
                  href={`/product/productId`} 
                >
                  product name
                </Link>
              </h3>
              <p className="text-muted-foreground">Category: category</p>
              <p className="font-medium ">price</p>
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
          ))}
        </section>
        <section className="flex flex-col gap-4 rounded-lg bg-gray-50 mt-16 lg:mt-0 px-4 py-6 sm:p-6 lg:p-8 self-start">
          <h2 className="text-lg font-medium text-gray-900 mb-2 ">Order summary</h2>
          <div className="flex justify-between capitalize text-sm">
            <span className="text-sm text-muted-foreground">
              subtotal
            </span>
            <span className="text-gray-900 font-medium">
              subtotal
            </span>  
          </div>
          <div className="flex justify-between capitalize text-sm pt-4 border-t border-gray-200">
            <span className="text-muted-foreground">
              flat transaction fee
            </span>
            <span className="text-gray-900 font-medium">
              fee
            </span>  
          </div>
          <div className="flex justify-between text-base font-medium capitalize text-gray-900 pt-4 border-t border-gray-200 mb-2">
            <span>order total</span>
            <span>subtotal</span>
          </div>
          <Button size={'lg'}>
            Checkout
          </Button>
        </section>
      </div>
    </div>
  )
}
