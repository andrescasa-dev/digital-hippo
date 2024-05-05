import { PRODUCT_CATEGORIES } from "../config"
import { Product } from "@/payload-types"
import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
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


type CreateMetadataArgs = {
  title?: string
  description?: string
  thumbnail?: string
  icon?: string
  noIndex?: boolean
}

export function createMetadata({
  title = 'DigitalHippo - the marketplace for digital assets',
  description= 'DigitalHippo is an open-source marketplace for high-quality digital goods.',
  thumbnail = '/thumbnail.webp',
  icon = '/favicon.ico',
  noIndex = false,
}: CreateMetadataArgs = {}): Metadata {
  return {
    title,
    description,
    icons: icon,
    openGraph:{
      title,
      description,
      images:[{
        width: 600,
        height: 600,
        url: thumbnail
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@AndresCaAbout',
      images: [thumbnail]
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    robots: noIndex ? {
      index: false,
      follow: false,
    } : undefined,
  }
}