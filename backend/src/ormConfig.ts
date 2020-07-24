import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: ["entities/**/*.*"],
	host: process.env.RDS_HOSTNAME,
	port: +process.env.RDS_PORT,
	username: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
}

export default connectionOptions
