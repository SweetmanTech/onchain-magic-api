import { NextApiRequest, NextApiResponse } from "next"
import { createMiddlewareDecorator, NextFunction, ConflictException } from "next-api-decorators"
import AllowList from "../Models/AllowList"
import dbConnect from "../utils/db"

export const ApplicantRegistered = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const { walletAddress } = req.body
    await dbConnect()
    const result = await AllowList.find({ walletAddress }).lean()
    if (result.length === 0) {
      next()
    } else {
      throw new ConflictException("Applicant already registered")
    }
  },
)
