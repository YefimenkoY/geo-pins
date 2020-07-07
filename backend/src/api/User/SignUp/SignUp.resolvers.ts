import { Resolvers } from "resolvers"
import { SignUpMutationArgs } from "../../../types/graph"
import User from "../../../entities/User"
import { createToken } from "../../../utils"
import { Token } from "../../../types/graph"

const resolvers: Resolvers = {
  Mutation: {
    SignUp: async (_, args: SignUpMutationArgs): Promise<Token> => {
      try {
        const user = await User.create({ ...args.input }).save()
        return { token: await createToken(user) }
      } catch ({ message }) {
        console.info({ message })
        throw new Error(message)
      }
    },
  },
}

export default resolvers
