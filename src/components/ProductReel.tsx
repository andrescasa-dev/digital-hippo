'use client'
import { TProductQuerySchema } from "@/lib/validators/product-query-validator"
import { trpc } from "@/trpc/client"
import ListingProducts from "./ListingProducts"
import Link from "next/link"


type productReelProps  = {
  title: string,
  subtitle?: string,
  href?: string,
  query: TProductQuerySchema
}
const PRODUCTS_LIMIT_FALLBACK = 4

export default function ProductReel( props: productReelProps) {
  const {query, href, title, subtitle} = props
  const limit = query.limit ?? PRODUCTS_LIMIT_FALLBACK
  const {data: queryResult, isLoading, error} = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )
  
  const fallbackProducts = Array<null>(limit).fill(null)

  let products = queryResult?.pages.flatMap((page)=> page.products) || fallbackProducts
  if(isLoading){
    products = fallbackProducts
  }
  
    return (
    <section>
      <div className='flex items-center justify-between mb-10'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
            {title}
          </h1>
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className='text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 mt-4">
        {products?.map((product, i)=>
          <ListingProducts product={product} index={i} key={crypto.randomUUID()} />
        )}
      </div>
    </section>
  )
}
