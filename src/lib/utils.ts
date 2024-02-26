import { PRODUCT_CATEGORIES } from "../config"
import { Product } from "@/payload-types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice (price : number | string) {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(numericPrice)
}

export function getValidImageUrls (product : Product) {
  return product.images.map(({image}) => {
    if(!image || image === null) return console.error(`product has no image. Product id: ${product.id}`)
    if(typeof image === 'object'){
      return image.url
    }
    else{
      console.error('')
      console.error(`trying to get a image url from a imageID insufficient depth in the product object. product id:${product.id}`)
      return image
    }
  }).filter(Boolean) as string[]
}

export function getCategoryLabel (category: string){
  return PRODUCT_CATEGORIES.find((productCategory) => productCategory.value === category)?.name
}