import 'dotenv/config'
import ExpressServer from "./src/Server";

export const nodeServer = new ExpressServer()
nodeServer.listen()