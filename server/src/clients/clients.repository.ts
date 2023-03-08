import {Equipment} from '../Models/Equipment';
import {Subscriber} from '../Models/Subscriber';
import {DefaultResponse, getDataFromDatabase} from '../db-helpers';

class ClientsRepository {

    async getSubscribers() {
        const sql = `SELECT * FROM Subscriber`
        const subscribers = await getDataFromDatabase(sql)
        return subscribers as DefaultResponse<Subscriber[]>
    }

    async getEquipment() {
        const sql = `SELECT * FROM Equipment`
        const equipment = await getDataFromDatabase(sql)
        return equipment as DefaultResponse<Equipment[]>
    }

    async deleteClient(id: number) {
        console.log('[server]: Database: delete row with id' + id)
        const sql = `DELETE FROM Subscriber
                     WHERE rowid = ${id}`
        const resultCode = await getDataFromDatabase(sql)
        return resultCode as DefaultResponse<{}>
    }

}

export default new ClientsRepository()