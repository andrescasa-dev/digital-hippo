import { CollectionConfig } from "payload/types";
import { addUserHook, isAdminOrOwner } from "../lib/payload-utils";

/* Todo
-[ ] client access
*/

export const MediaFiles : CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [addUserHook]
  },
  admin:{
    hidden: ({user}) => user.role !== 'admin'
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
      admin:{
        hidden: true
      }
    }
  ],
  upload:{
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*']
  }
}