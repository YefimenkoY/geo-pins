import { Resolvers } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import Pin from "../../../entities/Pin"
import { MutationDeletePinArgs } from "../../../types/graph"

const resolvers: Resolvers = {
	Mutation: {
		DeletePin: authenticated(
			async (_, args: MutationDeletePinArgs, ctx): Promise<Pin[]> => {
				try {
					await Pin.delete({ id: +args.input.pinId })
					return Pin.find({
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
