import AddToCartButton from "@/components/AddToCartButton"
import ImageSlider from "@/components/ImageSlider"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ProductReel from "@/components/ProductReel"
import { getPayloadClient } from "@/get-payloadClient"
import { formatPrice, getCategoryLabel, getValidImageUrls } from "@/lib/utils"
import { Check, Shield, Slash } from "lucide-react"

type productDetailProps = {
  params:{
    productId: string
  }
}

const BREADCRUMBS = [
  {
    label: 'Home',
    href: '#'
  },
  {
    label: 'Products',
    href: '#'
  }
]

export default async function productDetail(props: productDetailProps) {
  const {productId} = props.params
  const payload = await getPayloadClient()
  const {docs: products} = await payload.find({
    collection: 'products',
    limit: 1,
    where:{
      id: {
        equals: productId
      },
      approvedForSales: {
        equals: 'approved'
      }
    }
  })

  const [product] = products
  return (
    <MaxWidthWrapper>
      <div className="grid md:grid-cols-2 my-24 gap-x-8 gap-y-10 mx-auto max-w-2xl md:max-w-5xl mb-36">
        <div className="flex flex-col gap-4">
          <ol className="flex items-center">
            {
              BREADCRUMBS.map(({href, label}, i, breadcrumbArray)=>{
                return (
                  <li className="flex items-center" key={crypto.randomUUID()}>
                    <a 
                      href={href}
                      className="text-sm text-muted-foreground font-medium capitalize"
                      >
                      {label}
                    </a>
                    {i < breadcrumbArray.length - 1 
                      ? <Slash key={crypto.randomUUID()} className="mx-2 w-3 h-3 text-gray-300" /> 
                      : null }
                  </li>
                )
              })
            }
          </ol>
          <h1 className="text-3xl font-bold sm:text-4xl tracking-tight">
            {product.product_name}
          </h1>
          <ul className="flex ">
            <li 
              className="text-gray-900 font-medium"
              aria-label="price"
            >
              {formatPrice(product.price)}
            </li>
            <div aria-hidden="true" className="h-full w-px bg-gray-300 mx-4"></div>
            <li 
              className="text-muted-foreground"
              aria-label="category"
            >
              {getCategoryLabel(product.category)}
            </li>
          </ul>
          <p className="text-muted-foreground text-base">{product.description}</p>
          <p className="text-muted-foreground text-sm flex gap-3 mt-4">
            <Check className="text-green-500"/>
            Eligible for instant delivery
          </p>
        </div>
        <div className="md:row-span-2 max-w-2xl overflow-hidden">
          <ImageSlider 
            urls={getValidImageUrls(product)}
          />
        </div>
        <div>
          <AddToCartButton product={product} />
          <p className="flex gap-2 text-sm justify-center text-muted-foreground">
            <Shield />
            30 Day Return Guarantee
          </p>
        </div>
      </div>
      <ProductReel 
        title="Similar Icons"
        subtitle={`Browse similar high-quality Icons just like ${product.product_name}`}
        href="/products"
        query={{
          category: product.category,
        }}
      />
    </MaxWidthWrapper>
  )
}
