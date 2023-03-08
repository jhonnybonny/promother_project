import express from "express";
import LogsController from "../logs/logs.controller";

const logsRoute = express.Router()

logsRoute.get('', LogsController.getLogs)
logsRoute.post('/unknown', LogsController.executeUnknown)
logsRoute.post('', LogsController.startProcess)
logsRoute.delete('', LogsController.killProcess)
logsRoute.delete('/reset', LogsController.resetDatabase)

export default logsRoute