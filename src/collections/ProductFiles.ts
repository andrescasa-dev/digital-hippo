import { User } from "payload/dist/auth";
import { Access, CollectionConfig } from "payload/types";
import { addUserHook } from "../lib/payload-utils";

const isBuyerOrSellerOrAdmin: Access = async ({req})=>{
  const userReq = req.user as User | null
  if(!userReq) return false
  if(userReq.role === 'admin') return true
  
  // seller files
  const {docs: products} = await req.payload.find({
    collection: 'products',
    depth: 0,
    where: {
      user: {
        equals: userReq.id
      }
    }
  })
  
  const ownedProductFileIds = products
    .map((product) =>{
      return typeof product.files === 'string' ? product.files : product.files.id
    })
    .flat()

  // buyer files
  const {docs: orders} = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: userReq.id
      }
    }
  })

  const purchasedProductFilesIds = orders.map((order)=>{
    return order.products.map((product)=>{
      if(typeof product === 'string') 
        return req.payload.logger.error('insufficient depth to find product files in an order ' + product )
      return typeof product.files === 'string' ? product.files : product.files.id
    })
  })
  .filter(Boolean)
  .flat()

  return {
    id:{
      in: [
        ...purchasedProductFilesIds,
        ...ownedProductFileIds
      ]
    }
  }
}

export const ProductFiles : CollectionConfig = {
  slug: 'product-files',
  hooks:{
    beforeChange: [addUserHook],
  },
  access: {
    read: isBuyerOrSellerOrAdmin,
    update: ({req}) => req.user.role === 'admin',
    delete: ({req}) => req.user.role === 'admin'
  },
  fields: [
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin:{
        hidden: true
      }
    }
  ],
  upload:{
    staticURL:'/files',
    staticDir: 'files',
    mimeTypes: [
      'image/*',
      'font/*',
      'application/postscript' // eg: files with .ps extension, like photoShop files
    ]
  }
}
