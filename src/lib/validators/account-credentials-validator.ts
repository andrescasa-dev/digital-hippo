import { string, z } from "zod"

export const credentialsSchema = z.object({
  email: string().email(),
  password: string().min(8, { message: 'the password should be at least 8 characters'})
})

// (?) I don't understand this TS syntax
export type Credentials = z.infer<typeof credentialsSchema>