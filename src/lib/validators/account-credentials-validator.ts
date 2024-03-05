import { string, z } from "zod"

export const credentialsSchema = z.object({
  email: string().email(),
  password: string().min(8, { message: 'The password should be at least 8 characters'})
})

export type Credentials = z.infer<typeof credentialsSchema>