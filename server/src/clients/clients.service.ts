import ClientsRepository from './clients.repository';
import {StatusCodes} from '../types';
import {initialData} from './utils';

class ClientsService {

    async getClients() {
        const subscribers = await ClientsRepository.getSubscribers()
        const equipments = await ClientsRepository.getEquipment()

        const hasError = (
            subscribers.resultCode !== StatusCodes.Success || equipments.resultCode !== StatusCodes.Success
        )

        if (hasError) {
            subscribers.data = initialData
            return subscribers
        }

        subscribers.data.forEach( subscriber => {
            const equipmentIndex = equipments.data.findIndex( item => item.id === subscriber.id )
            if (equipmentIndex !== -1) subscriber.imei = equipments.data[equipmentIndex].imei
            else subscriber.imei = 0
        } )

        return subscribers
    }

    async deleteClient(id: number) {
        return await ClientsRepository.deleteClient(id)
    }

}

export default new ClientsService()