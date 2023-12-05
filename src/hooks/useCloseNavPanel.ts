import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useOnClickOutside } from "./useOnClickOutside"
import { RefObject, useEffect } from "react"


const useCloseNavPanel = ( headerRef : RefObject<HTMLElement | null>) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const closeNav = () =>{
    const params = new URLSearchParams(searchParams)
    if(params.get('category')){
      params.delete('category')
      console.log('nav panel closed')
      router.replace(`${pathname}?${params}`)
    }
  }

  useOnClickOutside(headerRef, () => closeNav())

  useEffect(()=>{
    const closeHandler = (e: KeyboardEvent) =>{
      if(e.key === 'Escape'){
        closeNav()
      }
    }
    document.addEventListener('keydown',closeHandler)
    return () => {
      document.removeEventListener('keydown',closeHandler)
    }
  },[])

  return 
}

export default useCloseNavPanel