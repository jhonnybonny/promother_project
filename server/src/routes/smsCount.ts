import express from "express";
import FrequencyController from "../sms-count/sms-count.controller";

const frequencyRoute = express.Router()

frequencyRoute.get('', FrequencyController.getSmsAmount)

export default frequencyRoute