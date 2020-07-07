import { Resolvers } from "resolvers"
import { SignInMutationArgs } from "../../../types/graph"
import { Token } from "../../../types/graph"
import User from "../../../entities/User"
import { createToken } from "../../../utils"

const resolvers: Resolvers = {
	Mutation: {
		SignIn: async (_, args: SignInMutationArgs): Promise<Token> => {
			const { login, password } = args.input

			try {
				const user = await User.findOne({ login })
				if (!user)
					throw Error(`User with login ${args.input.login} is not found`)

				const isValid = user.comparePasswords(password)
				console.log(isValid, password)
				if (!isValid) throw Error("Wrong password")

				return {
					token: await createToken(user),
				}
			} catch (e) {
				throw Error(e.message)
			}
		},
	},
}

export default resolvers
