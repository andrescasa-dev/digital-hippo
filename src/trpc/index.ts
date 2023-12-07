import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(()=>{
    return 'hola mundo trpc' 
  })
})

export type AppRouter = typeof appRouter