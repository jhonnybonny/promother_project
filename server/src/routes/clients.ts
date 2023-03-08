import express from "express";
import ClientsController from "../clients/clients.controller";

const clientsRoute = express.Router()

clientsRoute.get('', ClientsController.getClients)
clientsRoute.delete('/:id', ClientsController.deleteClient)

export default clientsRoute