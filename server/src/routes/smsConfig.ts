import express from "express";
import SmsConfigController from '../sms-config/sms-config.controller';

const smsConfigRoute = express.Router()

smsConfigRoute.get('', SmsConfigController.getConfig)
smsConfigRoute.patch('', SmsConfigController.editConfig)

export default smsConfigRoute