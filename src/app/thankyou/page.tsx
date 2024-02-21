import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { FEE } from "@/config"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

/**
 * To do
 * - [ ] When payed is true
 */

function page() {
  const [orderNumber, productImage, category, productPrice,subtotal, total, email, isPayed, mediaFile, productName] = [123, "productImageUrl", "category",123,123,123, "email", true, "mediaFile", "productName"]
  
  return (
    <MaxWidthWrapper className=" lg:pl-0">
      <div className="grid lg:grid-cols-2">
        <div className="w-full relative">
          <Image
            className="hidden lg:block object-cover object-center"
            src={"/checkout-thank-you.jpg"}
            fill={true}
            alt="thank you image"
          />
        </div>
        <div className="grid gap-y-16 px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <section className="grid gap-y-2">
            <p className="text-blue-600 font-medium text-sm">Order successful</p>
            <h1 className="text-gray-900 font-bold text-4xl sm:text-5xl tracking-tight">Thanks for ordering</h1>
            <p className="text-muted-foreground">
              {isPayed 
              ? <>Your order was processed and your assets are available to download below. We&apos;ve sent your receipt and order details to <span className="font-medium text-gray-900">{email}</span></>
              : <>We appreciate your order, and we&apos;re currently processing it. So hang tight and we&apos;ll send you confirmation very soon!</>
              }
            </p>
          </section>
          <section className="grid divide-y [&>*]:py-6">
            <div className="text-sm">
              <label 
                className="text-muted-foreground"
                htmlFor='orderNumber'
              >
                Order number
              </label>
              <p className="font-medium text-gray-900" id="orderNumber">{orderNumber}</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Image 
                className="rounded-md"
                src={'/checkout-thank-you.jpg'} 
                height={96} width={96} 
                alt="productImage" 
              />
              <div className="flex flex-col justify-between p-1">
                <p className="text-muted-foreground font-medium">Category: {category}</p>
                {
                  isPayed && 
                  <a 
                    href={mediaFile} 
                    download={productName}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Download asset
                  </a>
                }
              </div>
              <p className="ml-auto">{formatPrice(productPrice)}</p>
            </div>
            <div className="grid gap-y-6 text-sm font-medium text-gray-900">
              <div className="flex justify-between">
                <label
                  className="text-muted-foreground capitalize"
                  htmlFor="subtotal">subtotal</label>
                <p 
                  id="subtotal"
                >
                  {formatPrice(subtotal)}
                </p>
              </div>
              <div className="flex justify-between">
                <label 
                  htmlFor="transactionFee"
                  className="text-muted-foreground capitalize"
                >
                  transactionFee
                </label>
                <p 
                  id="transactionFee"
                >
                  {formatPrice(FEE)}
                </p>
              </div>
            </div>
            <div className="flex justify-between font-medium text-gray-900 capitalize">
              <h3>
                <label htmlFor="total">total</label>
              </h3>
              <p id="total">{formatPrice(total)}</p>
            </div>
          </section>
          <section className="flex justify-between text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">
                  Shipping To
                </h4>
                <p>{email}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Order Status
                </h4>
                <p>{isPayed ? "idk" : "Pending payment"}</p>
              </div>
          </section>
          <div className="border-t border-gray-200 flex justify-end pt-6">
            <Link href={"idk"} className="text-blue-600 hover:text-blue-500 font-medium text-sm">
              Continue Shopping &rarr;
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default page