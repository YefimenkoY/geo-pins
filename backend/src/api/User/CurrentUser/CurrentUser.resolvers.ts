import { Resolvers, ICtx } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import User from "../../../entities/User"

const resolvers: Resolvers = {
  Query: {
    CurrentUser: authenticated(
      async (_, args, ctx: ICtx): Promise<User> => {
        const { login } = ctx.currentUser
        return await User.findOne({ login }, { relations: ["pins"] })
      },
    ),
  },
}

export default resolvers
