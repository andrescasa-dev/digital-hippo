import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  // auth: {
  //   verify: {
  //     generateEmailHTML: ({token}) => {
  //       return (`<h1>Please verify</h1>`)
  //     }
  //   }
  // },
  auth: true,
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  
  fields: [
    {
      name: 'role',
      required: true,
      defaultValue: 'user',
      type: 'select',
      admin: {
        condition: () => false
      },
      options: [
        {
          label: 'User',
          value: 'user'
        },
        {
          label: 'Admin',
          value: 'admin'
        }
      ]
    }
  ]
}