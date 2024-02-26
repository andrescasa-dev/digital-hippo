import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ProductReel from "@/components/ProductReel"
import { getCategoryLabel } from "@/lib/utils"

type param = string[] | string | undefined

type productsParams = {
  searchParams: {[key: string]: param }
}

const parseToUniqueParam = (param: param) => {
  return typeof param === 'string' ? param : undefined
}

function products(params: productsParams) {
  const category = parseToUniqueParam(params.searchParams.category)  
  const categoryLabel = category && getCategoryLabel(category)
  const sort = parseToUniqueParam(params.searchParams.sort)

  return (
    <MaxWidthWrapper className="mt-12">
      <ProductReel 
        title = {categoryLabel ?? 'Browse high-quality assets'}
        query={{
          limit: 40,
          category,
          sort: sort === 'asc' || sort === 'desc' ? sort : undefined
        }}
      />
    </MaxWidthWrapper>
  )
}


export default products