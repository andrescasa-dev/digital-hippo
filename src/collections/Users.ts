import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `https://localhost:3000/verify?token=${token}`

        return `Hey ${user.email}, verify your email by clicking here: ${url}`
      },
    },
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        {
          label: 'User',
          value: 'user'
        },
        {
          label: 'Admin',
          value: 'admin'
        }
      ],
      required: true,
    },
    {
      // To do: access set up
      name: 'products',
      label: 'Products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true
    }
  ]
}