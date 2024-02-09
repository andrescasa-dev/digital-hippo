'use client'

import { Product } from "@/payload-types"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useCart } from "@/hooks/useCart"
import { cn } from "@/lib/utils"

type addToCartButtonProps = {
  product: Product
}

export default function AddToCartButton( {product}: addToCartButtonProps) {
  const [additionStatus, setAdditionStatus] = useState<"waiting"| "conflict" | "success">("waiting")
  const { addItem } = useCart()
  const msg = {
    "waiting": 'add to cart',
    "conflict": 'ups already in cart',
    "success": "item added!"
  }

  const handleClick = () => {
    const {alreadyInCart} = addItem(product)
    setAdditionStatus( alreadyInCart ? 'conflict' : 'success')
  }

  useEffect(()=>{
    const timerId = additionStatus !== "waiting" && setTimeout(()=>{
      setAdditionStatus('waiting')
    }, 2000)
    return () => {
      timerId && clearTimeout(timerId)
    }
  }, [additionStatus])
  
  return (
    <Button 
      className={cn(
        "w-full mb-6 py-5 capitalize",
        {"bg-red-800": additionStatus === 'conflict'}
      )}
      disabled={additionStatus !== "waiting"} 
      onClick={handleClick}
      >
      {msg[additionStatus]}
    </Button>
  )
}
