'use client'

import { Product } from "@/payload-types"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

type addToCartButtonProps = {
  product: Product
}

export default function AddToCartButton( props: addToCartButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleClick = () => {
    console.log('click')
    setIsSuccess(true)
  }

  useEffect(()=>{
    const timerId = isSuccess && setTimeout(()=>{
      console.log('timeout')
      setIsSuccess(false)
    }, 2000)
    return () => {
      timerId && clearTimeout(timerId)
    }
  }, [isSuccess])
  
  return (
    <Button className="w-full mb-6 py-5 capitalize" disabled={isSuccess} onClick={handleClick}>
      {isSuccess ? 'item added!': 'add to cart'}
    </Button>
  )
}
