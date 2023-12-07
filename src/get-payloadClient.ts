import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import { InitOptions } from "payload/config";

/*
this is pattern use in order to use payload in NextJS, Source: https://payloadcms.com/docs/local-api/overview#nextjs-conflict-with-local-api
*/

// (?) why is being used dotenv instead of process.env
dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

// (?) i don't understand the use of as any in this case, without it TS launch an error, highlighting payload: "Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature"
let cached = (global as any).payload

if(!cached){
  cached = (global as any).payload = {
    client: null,
    promise: null
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
  seed?: boolean
}

export const getPayloadClient = async ({ initOptions, seed }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing')
  }
  
  if (cached.client) {
    return cached.client
  }
  
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    })
  }
  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }
  return cached.client
}

