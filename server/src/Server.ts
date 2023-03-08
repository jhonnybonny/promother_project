import express, {Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import BTSRoute from "./routes/BTS";
import smsCountRoute from "./routes/smsCount";
import BSCRoute from "./routes/BSC";
import clientsRoute from "./routes/clients";
import imsiExceptionRoute from './routes/imsiException';
import LogsService from './logs/logs.service';
import logsRoute from './routes/logs';
import smsConfigRoute from './routes/smsConfig';

class ExpressServer {

    private app: Application
    readonly port: number
    private paths: {
        clients: string
        smsCount: string
        BSC: string
        BTS: string
        imsiExceptions: string
        logs: string
        smsConfig: string
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT as unknown as number || 8000
        this.paths = {
            clients: '/clients',
            smsCount: '/smsCount',
            BSC: '/BSC',
            BTS: '/BTS',
            imsiExceptions: '/imsi-exceptions',
            logs: '/logs',
            smsConfig: '/sms-config'
        }
        LogsService.startWebSocketServer()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(bodyParser.json())
        this.app.use(cors())
        this.app.use(
            express.static(path.join(__dirname, "../../../client/build"))
        );
    }

    routes() {
        this.app.use(this.paths.clients, clientsRoute)
        this.app.use(this.paths.smsCount, smsCountRoute)
        this.app.use(this.paths.BTS, BTSRoute)
        this.app.use(this.paths.BSC, BSCRoute)
        this.app.use(this.paths.imsiExceptions, imsiExceptionRoute)
        this.app.use(this.paths.logs, logsRoute)
        this.app.use(this.paths.smsConfig, smsConfigRoute)

        this.app.use('*', (request, response) => {
            response.sendFile(
                path.join(__dirname, '../../../client/build/index.html')
            )
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        })
    }
}

export default ExpressServer