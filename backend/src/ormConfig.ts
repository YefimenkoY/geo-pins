import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: ["entities/**/*.*"],
	host: process.env.DB_HOSTNAME,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
}

export default connectionOptions
