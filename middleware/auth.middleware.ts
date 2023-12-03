import { NextApiRequest, NextApiResponse } from "next"
import {
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from "next-api-decorators"
import { Magic } from "@magic-sdk/admin"
import Auth from "../Models/Auth"
import dbConnect from "../utils/db"

const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY)
export const getApiKeys = async (collectionName) => {
  await dbConnect()
  const result = Auth.findOne({ collectionName }).lean()
  return result
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction,
  collectionName: string,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new NotFoundException("Authorization header not found")
  }
  const [, token] = authorization.split(" ")
  const apiKeys = await getApiKeys(collectionName)
  if (token !== apiKeys.apiKey) {
    throw new UnauthorizedException("Invalid token")
  }
  next()
}

export const AdminAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
      throw new NotFoundException("Authorization header not found")
    }
    const [, token] = authorization.split(" ")
    try {
      mAdmin.token.validate(token)
    } catch (e) {
      throw new UnauthorizedException("Invalid token")
    }
    next()
  },
)
export const AllowListAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    handler(req, res, next, "AllowList")
  },
)

export const ParticipantsAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) =>
    handler(req, res, next, "Participants"),
)
