import express from 'express';
import LogsService from './logs.service';
import {StatusCodes} from '../types';

class LogsController {
    async getLogs(request: express.Request, response: express.Response) {
        const initialMessage = [{text: 'Console started'}]
        response.status(200).json(initialMessage)
    }
    async startProcess(request: express.Request, response: express.Response) {
        LogsService.spawnCommand()
        response.status(200).json(StatusCodes.Success)
    }
    async killProcess(request: express.Request, response: express.Response) {
        LogsService.killProcess()
        response.status(200).json(StatusCodes.Success)
    }
    async resetDatabase(request: express.Request, response: express.Response) {
        LogsService.resetDatabase()
        response.status(200).json(StatusCodes.Success)
    }
    async executeUnknown(request: express.Request, response: express.Response) {
        LogsService.executeUnknown()
        response.status(200).json(StatusCodes.Success)
    }
}

export default new LogsController()