import { Resolvers, ICtx } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import Pin from "../../../entities/Pin"
import { CreatePinMutationArgs } from "../../../types/graph"

const resolvers: Resolvers = {
  Mutation: {
    CreatePin: authenticated(
      async (_, args: CreatePinMutationArgs, ctx): Promise<Pin> => {
        try {
          return await Pin.create({
            ...args.input,
            author: ctx.currentUser,
          }).save()
        } catch ({ message }) {
          throw Error(message)
        }
      },
    ),
  },
}

export default resolvers
