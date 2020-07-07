import User from "../entities/User"

export type Resolver = (root: any, args: any, context: any, info: any) => any

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver
  }
}

export interface ICtx {
  currentUser: User | null | undefined
}
