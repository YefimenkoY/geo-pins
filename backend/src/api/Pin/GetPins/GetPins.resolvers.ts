import { Resolvers } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import Pin from "../../../entities/Pin"

const resolvers: Resolvers = {
  Query: {
    GetPins: authenticated(
      async (_, args, ctx): Promise<Pin[]> => {
        try {
          return await Pin.find({
            where: {
              author: ctx.currentUser.id,
            },
            relations: ["author"],
          })
        } catch ({ message }) {
          throw Error(message)
        }
      },
    ),
  },
}

export default resolvers
