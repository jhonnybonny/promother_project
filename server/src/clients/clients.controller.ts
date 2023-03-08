import express from "express";
import clientsService from './clients.service';

class ClientsController {
    async getClients(request: express.Request, response: express.Response) {
        const clients = await clientsService.getClients()
        response.status(200).json(clients)
    }
    async deleteClient(request: express.Request, response: express.Response) {
        const resultCode = await clientsService.deleteClient(request.params.id as unknown as number)
        response.status(200).json(resultCode)
    }
}

export default new ClientsController()