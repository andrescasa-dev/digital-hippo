import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { ProductQuerySchema } from "../lib/validators/product-query-validator";
import { getPayloadClient } from "../get-payloadClient";

export const appRouter = router({
  auth: authRouter,
  getInfiniteProducts: publicProcedure
  .input(z.object({
    limit: z.number().min(1).max(100),
    cursor: z.number().nullish(),
    query: ProductQuerySchema
  }))
  .query(async ({input})=>{
    const {limit, cursor, query} = input
    const {sort, limit: queryLimit, ...constrains} = query
    const page = cursor || 1 
    const payload = await getPayloadClient()
    const whereConstrains : Record<string, {equals: string}> = {}

    Object.entries(constrains)
      .forEach(([key,value])=>{
        whereConstrains[key] = {
          equals: value
        }
      })
    
    const {docs : products, hasNextPage, nextPage } = await payload.find({
      collection: 'products',
      where: {
        approvedForSales: {
          equals: 'approved'
        },
        ...whereConstrains
      },
      sort,
      depth: 1,
      limit,
      page
    })
    return {
      products,
      nextPage: hasNextPage ? nextPage : null
    }
  })
})

export type AppRouter = typeof appRouter