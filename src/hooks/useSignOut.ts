import { useRouter } from "next/navigation"
import { toast } from "sonner"

const useAuth = () => {
  const router = useRouter()
  const signOut = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(!res.ok) throw new Error("something went wrong while trying to logout")
      toast.success("Signed out successfully")
      router.push('/sign-in')
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error("couldn't sing-out")
    }
  }
  return {signOut}
}

export default useAuth