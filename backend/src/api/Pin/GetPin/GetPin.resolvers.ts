import { QueryGetPinArgs } from "./../../../types/graph.d"
import { Resolvers } from "../../../types/resolvers"
import { authenticated } from "../../../utils"
import Pin from "../../../entities/Pin"

const resolvers: Resolvers = {
	Query: {
		GetPin: authenticated(
			async (_, args: QueryGetPinArgs, ctx): Promise<Pin> => {
				try {
					return await Pin.findOne({
						where: { id: args.input.id, author: ctx.currentUser },
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
