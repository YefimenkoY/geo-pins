import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: ["entities/**/*.*"],
	host: "db",
	port: 5432,
	username: "postgres",
	password: "test",
}

export default connectionOptions
