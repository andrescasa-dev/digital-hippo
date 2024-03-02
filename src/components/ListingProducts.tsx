import { PRODUCT_CATEGORIES } from "@/config"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/payload-types"
import Link from "next/link"
import 'swiper/css'
import { Skeleton } from "./ui/skeleton"
import ImageSlider from "./ImageSlider"

type ListingProductsProps = {
  product : Product | null,
  index : number,
}

export default function ListingProducts({product, index} : ListingProductsProps) {
  if(!product){
    return <ListingProductSkeleton />
  }
  const {product_name, price, } = product
  const categoryLabel = PRODUCT_CATEGORIES.find((category) => category.value === product.category)?.name

  const imageUrls = product.images.map(({image}) => {
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
 
  return (
    <Link 
      href={`/product/${product.id}`}
      className="flex flex-col gap-1"
    >
      <ImageSlider urls={imageUrls}/>
      <div className="flex min-[340px]:flex-col mt-3 gap-2 sm:gap-1 justify-between flex-wrap">
        <h3 className="font-medium capitalize text-sm text-gray-700 w-full">
          {product_name}
        </h3>
        <p className="color-muted text-gray-500 text-sm">
          {categoryLabel}
        </p>
        <p className="font-medium text-gray-900 text-sm">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  )
}

function ListingProductSkeleton(){
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-1/4" />
    </div>
  )
}
