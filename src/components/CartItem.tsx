import { useCart } from "@/hooks/useCart";
import { formatPrice, getCategoryLabel, getValidImageUrls } from "@/lib/utils";
import { Product } from "@/payload-types";
import { X } from "lucide-react";
import Image from "next/image";

export default function CartItem({product}: {product: Product}) {
  const imageUrl = getValidImageUrls(product)[0]
  const category = getCategoryLabel(product.category)
  const {removeItem} = useCart()
  return (
    <article className="flex gap-2 pr-6">
      <Image src={imageUrl} alt="product image" height={100} width={100} />
      <div className="flex flex-col gap-2">
        <h2 className="font-medium capitalize text-base line-clamp-1">
          {product.product_name}
        </h2>
        <p className='line-clamp-1 text-xs capitalize text-muted-foreground'>
          {category}
        </p>
        <button 
          className="flex text-xs text-muted-foreground items-center"
          onClick={()=>{
            removeItem(product.id)
          }}
        >
          <X className="h-4 w-4"/> 
          Remove
        </button>
      </div>
      <p className="ml-auto font-bold text-xs">{formatPrice(product.price)}</p>
    </article>
  )
}
