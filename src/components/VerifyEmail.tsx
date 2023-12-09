'use client'

import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"

const VerifyEmail = ({token} : {token: string}) => {
  const {data, isError, isLoading} = trpc.auth.verifyEmail.useQuery({token})

  if(isLoading){
    return (
      <div className="my-auto flex flex-col gap-2 items-center pt-10">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300"/>
        <h1 className="text-xl font-bold">
          Verifying...
        </h1>
        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    )
  }

  if(isError){
    return(
      <div className="my-auto flex flex-col gap-2 items-center pt-10">
        <XCircle className="h-8 w-8 text-red-500"/>
        <h1 className="text-xl font-bold">
          There was a problem
        </h1>
        <p className="text-sm text-muted-foreground">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    )
  }

  if(data.success){
    return(
      <div className="my-auto flex flex-col gap-2 items-center pt-10">
        <Image src={'/hippo-email-sent.png'} height={300} width={300} alt="hippo with an email"/>
        <h1 className="text-xl font-bold">
          You&apos;re all set
        </h1>
        <p className="text-sm text-muted-foreground">
          Thank you to verify your email
        </p>
        <Button className="md:min-w-[150px] mt-1">Sing In</Button>
      </div>
    )
  }
}

export default VerifyEmail