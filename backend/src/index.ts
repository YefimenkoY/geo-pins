import "./env"

import { Options } from "graphql-yoga"
import { createConnection } from "typeorm"
import app from "./app"
import connectionOptions from "./ormConfig"

const PORT: number | string = 5000
const PLAYGROUND_ENDPOINT: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"
const SUBSCRIPTION_ENDPOINT: string = "/subscription"

const appOptions: Options = {
	port: PORT,
	playground: PLAYGROUND_ENDPOINT,
	endpoint: GRAPHQL_ENDPOINT,
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT,
	},
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

createConnection(connectionOptions)
	.then(() => {
		app.start(appOptions, handleAppStart)
	})
	.catch(error => console.log(error))
