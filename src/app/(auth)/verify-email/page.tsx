import VerifyEmail from "@/components/VerifyEmail"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { AlertCircle, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServerProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const VerifyEmailPage = ({ searchParams }: ServerProps) => {
  const {email, token} = searchParams
  const isValidToken = typeof token === 'string' && token !== ''
  const tokenNotProvided = typeof token === 'undefined'

  if(tokenNotProvided){
    return (
      <div className="my-auto flex flex-col gap-2 items-center pt-10 mb-20">
        <Image src={'/hippo-email-sent.png'} height={300} width={300} alt="hippo with an email"/>
        <h1 className="text-xl font-bold">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground">
          we&apos;ve send a verification link to {email}
        </p>
        {/* Bypass Email verification error */}
        <Alert variant="destructive" className="w-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            We are working on a email provider error, for the moment, this step is omitted, please: <Link href={'/sign-in'} className={buttonVariants({variant:"link"})}> Sign in</Link>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if(isValidToken){
    return <VerifyEmail token={token}/>
  }

  return(
    <div className="my-auto flex flex-col gap-2 items-center pt-10">
      <XCircle className="h-8 w-8 text-red-500"/>
      <h1 className="text-xl font-bold">
        There was a problem
      </h1>
      <p className="text-sm text-muted-foreground">
        This token is not valid. Please try again.
      </p>
    </div>
  )
}

export default VerifyEmailPage