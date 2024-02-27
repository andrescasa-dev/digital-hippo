'use client'
import useAuth from "@/hooks/useSignOut"

function SignOutButton({className}:{className?:string}) {
  const {signOut} = useAuth()
  return (
    <button className={className} onClick={signOut}>
      Sign Out
    </button>
  )
}

export default SignOutButton