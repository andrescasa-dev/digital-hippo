import express from 'express'
import { getPayloadClient } from './get-payloadClient';
import { nextRequestHandler, nextServer } from './next-utils';

const app = express();
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
  // Payload config
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
      }
    }
  })
}

// Middleware for connecting NextJS
app.use((req,res) => nextRequestHandler(req,res))

nextServer.prepare().then(() => {
  app.listen(PORT, async ()=>{
    
  })
})

start()