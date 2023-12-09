import { tokenSchema } from "../lib/validators/token-schema";
import { getPayloadClient } from "../get-payloadClient";
import { credentialsSchema } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from '@trpc/server'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(credentialsSchema)
    .mutation( async({ input }) => {
      const { email, password } = input
      
      const payload = await getPayloadClient()
      const {docs: users} = await payload.find({
        collection: 'users',
        where: { email: { equals: email }} 
      })

      if( users.length !== 0){
        throw new TRPCError({ code: 'CONFLICT', message: 'This user is already signed up' })
      }

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user'
        }
      })

      return { success: true, sendToEmail: email}
    }),

  verifyEmail: publicProcedure
    .input(tokenSchema)
    .query(async ({input}) => {
      const { token } = input
      const payload = await getPayloadClient()
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token
      })

      if(!isVerified){
        throw new TRPCError({code: 'UNAUTHORIZED'})
      }
      
      return {success: true}
    })
})