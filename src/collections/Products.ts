import { AfterChangeHook } from 'payload/dist/collections/config/types';
import { CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES } from "../config";
import { addUserHook } from '../lib/payload-utils';
import { Product } from "../payload-types";

/* (todo): 
-[ ] delete product after a user remove it from their product list 
-[ ] only access to owner or admin, clients can read the product (i guess)
  - [ ] bug: another user can update the product
*/

const syncUser : AfterChangeHook<Product> = async ({req, doc}) => {
  const userId = req.user.id
  const currentProduct = doc.id

  const userData = await req.payload.findByID({
    collection: 'users',
    id: userId,
    currentDepth: 1
  })
  
  const getProductsIds = (products: (Product | string)[]) => 
    products.map((product) => typeof product === 'string' ? product : product.id)

  const existingProductsIDs = userData.products ? getProductsIds(userData.products) : []
  

  await req.payload.update({
    collection: 'users',
    id: userId,
    data: {
      products: [...existingProductsIDs, currentProduct]
    }
  })
}

export const Products: CollectionConfig = {
  slug: 'products',
  hooks:{
    beforeChange: [addUserHook],
    afterChange: [syncUser]
  },
  admin:{
    useAsTitle: 'product_name',
  },
  fields: [
    {
      name: 'user',
      label: 'User',
      type: "relationship",
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin:{
        hidden: true
      }
    },
    {
      name: 'product_name',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    }
    ,
    {
      name: 'price',
      label: 'Price (USD)',
      type: 'number',
      min: 0,
      max: 1000,
      required: true,
      hasMany: false,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(({value, name})=>({value, label: name})),
      required: true,
      hasMany: false
    },
    {
      name: 'approvedForSales',
      label: 'Product Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        {
          value: 'pending',
          label: 'Pending'
        },
        {
          value: 'approved',
          label: 'Approved'
        },
        {
          value: 'denied',
          label: 'Denied'
        }
      ],
      required: true,
      hasMany: false,
      access: {
        read: ({req}) => req.user.role === 'admin',
        create: ({req}) => req.user.role === 'admin',
        update: ({req}) => req.user.role === 'admin',
      }
    },
    {
      name: 'images',
      label: 'Product Images',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      type: 'array',
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'files',
      labels: {
        singular: 'Product File',
        plural: 'Product Files',
      },
      type: 'array',
      minRows: 1,
      required: true,
      fields:[
        {
          name: 'file',
          type: 'upload',
          relationTo: 'product-files'
        }
      ]
    },
    {
      name: 'priceId',
      type: 'text',
      admin: {
        hidden: true
      },
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      }
    },
    {
      name: 'stripeId',
      type: 'text',
      admin: {
        hidden: true
      },
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      }
    }
  ]
}