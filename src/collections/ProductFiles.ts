import { CollectionConfig } from "payload/types";
import { addUserHook, isAdminOrOwner } from "../lib/payload-utils";
/* Todo
-[ ] client access
*/

export const ProductFiles : CollectionConfig = {
  slug: 'product-files',
  hooks:{
    beforeChange: [addUserHook],
  },
  access: {
    read: isAdminOrOwner,
    create: isAdminOrOwner,
    update: isAdminOrOwner
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