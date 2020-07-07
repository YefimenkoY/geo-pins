import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"

const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, "./api/**/*.gql"),
)

const allResolvers: any[] = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*"),
)

export default makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
})
