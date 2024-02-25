import { nextServer } from "../next-utils"
import { parse } from "url"
import express from 'express';
import { PayloadRequest } from "payload/types";
import { IncomingMessage } from "http";
import bodyParser from "body-parser";

export const authMiddleware = (req: express.Request, res: express.Response) => {
  const request = req as PayloadRequest

  if (!request.user)
    return res.redirect(`/sign-in?origin=${encodeURIComponent(req.originalUrl)}`)

  const parsedUrl = parse(req.url, true)
  const { query } = parsedUrl

  return nextServer.render(req, res, '/cart', query)
}

export type WebhookRequest = IncomingMessage & {
  rawBody: Buffer
}

export const webhookMiddleware = bodyParser.json({
  verify: (req: WebhookRequest, _, buffer) => {
    req.rawBody = buffer
  },
})