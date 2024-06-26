import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { MediaFiles } from './collections/Media'
import { ProductFiles } from './collections/ProductFiles'
import { Orders } from './collections/Order'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, MediaFiles, ProductFiles, Orders],
  routes: {
    admin:'/sell'
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta:{
      titleSuffix: '- DigitalHippo',
      favicon: '/favicon',
      ogImage: '/thumbnail.webp'
    }
  },
  rateLimit:{
    max: 2000
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})