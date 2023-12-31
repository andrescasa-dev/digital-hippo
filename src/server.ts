import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { getPayloadClient } from './get-payloadClient';
import { nextRequestHandler, nextServer } from './next-utils';
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';

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
  // Initialization of payload and being cached
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })
  // Middleware for connecting trpc
  app.use('/api/trpc', trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  // Middleware for connecting NextJS
  app.use((req,res) => nextRequestHandler(req,res))

  nextServer.prepare().then(() => {
    payload.logger.info('NextJS Started')
    app.listen(PORT, async ()=>{
      payload.logger.info(`Next App Url: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start()