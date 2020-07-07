import jwt from "jsonwebtoken"
import User from "./entities/User"
import { Request } from "express"
import { Resolver } from "./types/resolvers"

export const createToken = async (
  user: User,
  expiresIn: string = "5h",
): Promise<string> => {
  return await jwt.sign({ ...user }, process.env.SECRET, {
    expiresIn,
  })
}

export const getCurrentUser = async (req: Request): Promise<string | {}> => {
  const token = req.headers["authorization"]

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const authenticated = (resolver: Resolver) => async (
  root,
  args,
  crx,
  info,
) => {
  if (!crx.currentUser) throw new Error("Token is expired")
  return await resolver(root, args, crx, info)
}
