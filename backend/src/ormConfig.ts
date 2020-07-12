import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: ["entities/**/*.*"],
	host: process.env.PG_HOST,
	port: 5432,
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
}

export default connectionOptions
