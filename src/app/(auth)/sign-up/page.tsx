'use client'

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Credentials, credentialsSchema } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'


export default function SignUpPage() {
  const {register, handleSubmit, formState:{errors}} = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema)
  })

  const {mutate, error} = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if(err.data?.code === 'CONFLICT'){
        return toast.error('This user is already singed up')
      }
      
      toast.error('something happened, we are working on it, please try again')
      console.error('createPayloadUser error: ', err)
    },
    onSuccess: () => {
      toast.success('verification email sent')
    }
  })

  const onSubmit = ({email, password}: Credentials) => {
    mutate({email, password})
  }

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 grid-cols-[300px]">
        <Icons.logo className="h-20 w-20 justify-self-center" />
        <h1 className="justify-self-center">Create an account</h1>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            className={cn({
              'focus-visible:ring-red-500': errors.email
            })}
            placeholder="some@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            className={cn({
              'focus-visible:ring-red-500': errors.password
            })}
            type='password'
            placeholder="password"
            {...register("password")}
          />
          {  errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button >Sign up</Button>
        <Link
          className={cn(buttonVariants({variant: 'link'}), '-mt-4')}
          href={'/sing-in'}> 
          Already have and account? Sing-in
        </Link>
      </form>
    </div>
  )
}
