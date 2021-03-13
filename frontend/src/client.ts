import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	HttpLink,
	concat,
} from "@apollo/client"

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: localStorage.getItem("token") || "",
		},
	}))

	return forward(operation)
})

const httpLink = new HttpLink({
	uri:
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/graphql"
			: "/graphql",
})

export default new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "network-only",
		},
	},
})
