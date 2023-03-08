import express from "express";
import SmsCountRepository from './sms-count.repository';

class SmsCountController {
    async getSmsAmount(request: express.Request, response: express.Response) {
        const smsCount = await SmsCountRepository.getSmsCount()
        response.status(200).json(smsCount)
    }
}

export default new SmsCountController()