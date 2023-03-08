import express from "express";
import ServersController from "../Controllers/BTS.controller";

const serverRoute = express.Router()

serverRoute.get('', ServersController.getConfig)
serverRoute.patch('', ServersController.replaceLine)

export default serverRoute