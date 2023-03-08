import express from "express";
import BSCController from "../Controllers/BSC.controller";

const BSCRouter = express.Router()

BSCRouter.get('/', BSCController.getConfig)
BSCRouter.patch('/', BSCController.replaceLine)

export default BSCRouter