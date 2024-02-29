
import { PRODUCT_CATEGORIES } from "@/config"
import Cart from "./Cart"
import NavItem from "./NavItem"
import { ReactNode, useEffect } from "react"
import useCloseNavPanel from "@/hooks/useCloseNavPanel"

function NavBar({UserAccountNavBar}:{UserAccountNavBar:ReactNode}) {
  const closeNavPanel = useCloseNavPanel()

  useEffect(()=>{
    const closeHandler = (e: KeyboardEvent) =>{
      if(e.key === 'Escape'){
        closeNavPanel()
      }
    }
    document.addEventListener('keydown',closeHandler)
    return () => {
      document.removeEventListener('keydown',closeHandler)
    }
  },[closeNavPanel])
  
  return (
    <nav className="hidden sm:flex justify-between grow">
      <div className="flex gap-8">
        {PRODUCT_CATEGORIES.map((category) => (
          <NavItem key={category.value} category={category} />
        ))}
      </div>
      <div className="flex">
        {UserAccountNavBar}
        <Cart />
      </div>
    </nav>
  )
}

export default NavBar