import { z } from "zod";

export const ProductQuerySchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  category: z.string().optional(),
  sort: z.enum(['desc', 'asc']).optional(),
})

export type TProductQuerySchema =  z.infer<typeof ProductQuerySchema>