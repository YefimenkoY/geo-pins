import { Resolvers } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import Pin from "../../../entities/Pin"
import { MutationDeletePinArgs } from "../../../types/graph"

const resolvers: Resolvers = {
	Mutation: {
		DeletePin: authenticated(
			async (_, args: MutationDeletePinArgs): Promise<Pin[]> => {
				try {
					await Pin.delete({ id: +args.input.pinId })
					return Pin.find({})
				} catch ({ message }) {
					throw Error(message)
				}
			},
		),
	},
}

export default resolvers
