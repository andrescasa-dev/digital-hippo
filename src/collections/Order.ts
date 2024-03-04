import { isAdminOrOwner } from "../lib/payload-utils";
import { CollectionConfig } from "payload/types";

export const Orders : CollectionConfig = {
  slug: 'orders',
  admin:{
    useAsTitle: 'My Purchases',
    description: 'A list of all the orders that you made'
  },
  access: {
    create: ({req}) =>  req.user.rol === 'admin',
    read: isAdminOrOwner,
    update: ({req}) =>  req.user.rol === 'admin',
    delete: ({req}) =>  req.user.rol === 'admin',

  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin:{
        hidden: true
      }
    },
    {
      name: 'products',
      label: 'Products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
    {
      name: '_isPayed',
      admin: {
        hidden: true
      },
      type: 'checkbox',
      required: true,
      access:{
        read: ({req: {user}}) => user.role === 'admin' ,
        update: () => false,
        create: () => false,
      }
    }
  ]
}