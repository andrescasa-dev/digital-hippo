import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { getPayloadClient } from './get-payloadClient';
import { authMiddleware, webhookMiddleware } from './middlewares';
import { nextRequestHandler, nextServer } from './next-utils';
import { appRouter } from './trpc';
import { stripeWebhookHandler } from './webhooks';
import nextBuild from 'next/dist/build'
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions
) => ({
  req,
  res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {
  app.post('/api/webhooks/stripe', webhookMiddleware, stripeWebhookHandler)
  
  // Initialization of payload and being cached
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(
        'Next.js is building for production'
      )

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))

      process.exit()
    })

    return
  }

  // Protected routes
  app.use('/cart', payload.authenticate, authMiddleware)

  // Middleware for connecting trpc
  app.use('/api/trpc', trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  // Middleware that delegate the render process to NextJS for non-handle routes
  app.use((req,res) => nextRequestHandler(req,res))

  nextServer.prepare().then(() => {
    payload.logger.info('NextJS Started')
    app.listen(PORT, async ()=>{
      payload.logger.info(`Next App Url: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start()

