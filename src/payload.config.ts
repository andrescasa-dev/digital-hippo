import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'
import { Users } from './collections/Users'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Users],
  routes: {
    admin:'/sell'
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta:{
      titleSuffix: '- DigitalHippo',
      favicon: '/favicon',
      ogImage: '/thumbnail.jpg'
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