import { z } from "zod";

export const sessionValidator = z.object({
  ids: z.array(z.string())
})