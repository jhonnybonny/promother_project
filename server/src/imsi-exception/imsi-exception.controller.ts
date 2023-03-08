import express from 'express';
import fs from 'fs';

const jsonFilePath = './src/imsi-exception/imsi-exception.json'

const getJson = (): string[] => JSON.parse(fs.readFileSync(jsonFilePath) as unknown as string)

class ImsiExceptionController {
    async getExceptions(request: express.Request, response: express.Response) {
        const exceptionsJson = getJson()
       response.status(200).json(exceptionsJson)
    }
    async addException(request: express.Request, response: express.Response) {
        const exceptionsJson = getJson()
        exceptionsJson.push(request.body.newException)
        fs.writeFileSync(jsonFilePath, JSON.stringify(exceptionsJson))
        response.status(200).json(exceptionsJson)
    }
    async removeException(request: express.Request, response: express.Response) {
        const exceptionsJson = getJson()
        const newExceptionsJson = exceptionsJson.filter( (imsiInJson) => imsiInJson !== request.params.imsi )
        fs.writeFileSync(jsonFilePath, JSON.stringify(newExceptionsJson))
        response.status(200).json(newExceptionsJson)
    }
}

export default new ImsiExceptionController()