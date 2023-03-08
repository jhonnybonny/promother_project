import express from 'express';
import SmsConfigService from './sms-config.service';


class SmsConfigController {
    async getConfig(request: express.Request, response: express.Response) {
        const configResponse = SmsConfigService.getConfig()
        response.status(200).json(configResponse)
    }
    async editConfig(request: express.Request, response: express.Response) {
       const configJson = SmsConfigService.editConfig(request.body)
        response.status(200).json(configJson)
    }
}

export default new SmsConfigController()