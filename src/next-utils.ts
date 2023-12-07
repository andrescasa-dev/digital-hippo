import next from "next"

const PORT = Number(process.env.PORT) || 3000

export const nextServer = next({
  port: PORT,
  dev: process.env.NODE_ENV !== 'production'
})

export const nextRequestHandler = nextServer.getRequestHandler()