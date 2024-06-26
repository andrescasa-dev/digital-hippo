import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import { InitOptions } from "payload/config";
import nodemailer from 'nodemailer'

/*
this is pattern use in order to use payload in NextJS, Source: https://payloadcms.com/docs/local-api/overview#nextjs-conflict-with-local-api
*/

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
})


// (?) i don't understand the use of as any in this case, without it TS launch an error, highlighting payload: "Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature"
let cached = (global as any).payload


if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing')
  }
  
  if (cached.client) {
    return cached.client
  }
  
  if (!cached.promise) {
    const payloadInitOptions = {
      email: {
        transport: transporter,
        fromAddress: 'onboarding@resend.dev',
        fromName: 'DigitalHippo'        
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    }
    cached.promise = payload.init(payloadInitOptions)
  }

  try {
    console.log('Initializing payload')
    const payloadInitResponse = await cached.promise
    cached.client = payloadInitResponse
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}

