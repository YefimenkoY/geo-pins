import cors from "cors"
import { NextFunction, Request } from "express"
import { GraphQLServer, PubSub } from "graphql-yoga"
import helmet from "helmet"
import logger from "morgan"

import schema from "./schema"
import { getCurrentUser } from "./utils"
class App {
  public app: GraphQLServer
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: async ({ request }: { request: Request }) => {
        return {
          currentUser: await getCurrentUser(request),
        }
      },
    })
    this.middlewares()
  }
  private middlewares = (): void => {
    this.app.express.use(cors())
    this.app.express.use(logger("dev"))
    this.app.express.use(helmet())
  }
}

export default new App().app
