import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"


const useCloseNavPanel = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const closeNavPanel = useCallback(() =>{
    const params = new URLSearchParams(searchParams)
    if(params.get('tab')){
      params.delete('tab')
      router.replace(`${pathname}?${params}`)
    }
  },[pathname, router, searchParams])

  return closeNavPanel
}

export default useCloseNavPanel