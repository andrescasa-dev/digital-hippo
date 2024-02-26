'use client'

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Credentials, credentialsSchema } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'


export default function SignInPage() {
  const searchParams = useSearchParams()
  const originParam = searchParams.get('origin')
  const isSeller = searchParams.get('as') === 'seller'
  const pathname = usePathname()
  const router = useRouter()

  const {register, handleSubmit, formState:{errors}} = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema)
  })

  const {mutate: login, error, isLoading} = trpc.auth.signIn.useMutation({
    onError: (error) => {
      if(error.data?.code === 'UNAUTHORIZED'){
        toast.error('Invalid email or password')
      }
    },
    onSuccess: () => {
      toast.success('signed in successfully')
      router.refresh()
      if(isSeller){
        router.push('/sell')
        return
      }

      if(originParam){
        router.push(`${originParam}`)
        return
      }

      router.push('/')
    }
  })

  const onSubmit = ({email, password}: Credentials) => {
    login({email, password}) 
  }

  const toggleRole = () => {
    const params = new URLSearchParams(searchParams)
    if(isSeller){
      params.delete('as')  
    }
    else{
      params.set('as', 'seller')
    }
    router.replace(`${pathname}?${params}`)
  }

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 mb-20'>
      <div onSubmit={handleSubmit(onSubmit)} className="grid gap-2 grid-cols-[300px]">
        <Icons.logo className="h-20 w-20 justify-self-center" />
        <h1 className="justify-self-center">Sign {isSeller ? 'into your seller account' : 'in'} </h1>
        <Link
          className={cn(buttonVariants({variant: 'link'}))}
          href={'/sign-up'}> 
          Don&apos;t have an account? sing up
        </Link>
        <form className="grid gap-6" >
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
          <Button >{isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> :'Sign in'}</Button>
        </form>
        <div className="relative flex justify-center opacity-60">
          <div className="absolute inset-0 grid items-center -z-10 opacity-30" aria-hidden={true} >
            <div className="h-px bg-muted-foreground"></div>
          </div>
          <span className="text-muted-foreground p-1 bg-background uppercase text-sm">or</span>
        </div>
        <Button variant={'secondary'} onClick={toggleRole}> Sing in as {isSeller ? 'client' : 'seller' }  </Button>
      </div>
    </div>
  )
}
