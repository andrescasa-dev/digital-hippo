import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { FEE } from "@/config"
import { getPayloadClient } from "@/get-payloadClient"
import { getServerSideUser } from "@/lib/payload-utils"
import { formatPrice, getCategoryLabel } from "@/lib/utils"
import { Product, ProductFile, User } from "@/payload-types"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

type props = {
  searchParams: {
    [key: string] : string | string[] | undefined
  }
}

async function thankYouPage({searchParams}: props) {
  const payload = await getPayloadClient()
  const orderId = typeof searchParams.orderId === "string" ? searchParams.orderId : null
  if(!orderId) notFound()

  const {docs: orders} = await payload.find({
    collection: 'orders',
    where: {
      id:{
        equals: orderId
      }
    },
    depth: 2
  })

  if(orders.length === 0) notFound()

  const [order] = orders
  const {_isPayed} = order
  const products = order.products as Product[]
  const { email } = order.user as User
  const total = products.reduce((total, {price}) => total + price, 0)
  const subtotal = total + FEE

  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies)
  if(!user || user.id !== (order.user as User).id){
    redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
  }

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
              {_isPayed 
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
              <p className="font-medium text-gray-900" id="orderNumber">{orderId}</p>
            </div>
            <div className="grid">
              {products.map(product => (
                <div className="flex gap-6 text-sm" key={product.id}>
                  <Image 
                    className="rounded-md"
                    src={'/checkout-thank-you.jpg'} 
                    height={96} width={96} 
                    alt="productImage" 
                  />
                  <div className="flex flex-col justify-between p-1">
                    <p className="text-muted-foreground font-medium">Category: {getCategoryLabel(product.category)}</p>
                    {
                      _isPayed && 
                      <a 
                        href={(product.files as ProductFile).url as string} 
                        download={product.product_name}
                        className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                          Download asset
                      </a>
                    }
                  </div>
                  <p className="ml-auto">{formatPrice(product.price)}</p>
                </div>)
              )}
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
                <p>{_isPayed ? "idk" : "Pending payment"}</p>
              </div>
          </section>
          <div className="border-t border-gray-200 flex justify-end pt-6">
            <Link 
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              href="/products"
            >
              Continue Shopping &rarr;
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default thankYouPage