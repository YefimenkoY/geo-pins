import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink } from "apollo-link"
import { Context } from "@apollo/react-common"

const httpLink: ApolloLink = createHttpLink({
	uri:
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/graphql"
			: "/graphql",
})

const authLink: Context = setContext((_, { headers }) => {
	const token: string = localStorage.getItem("token") || ""
	return {
		headers: {
			...headers,
			authorization: token,
		},
	}
})

export default new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})
