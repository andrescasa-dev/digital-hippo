'use client'
import { TProductQuerySchema } from "@/lib/validators/product-query-validator"
import { trpc } from "@/trpc/client"


type productReelProps  = {query: TProductQuerySchema}
const PRODUCTS_LIMIT_FALLBACK = 4

export default function ProductReel( props: productReelProps) {
  const {query} = props
  const {data: queryResult, isLoading, error} = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? PRODUCTS_LIMIT_FALLBACK,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )
  
  return (
    <>
      <div>ProductReel</div>
      <p>{isLoading ? 'loading' : ''}</p>
    </>
  )
}
