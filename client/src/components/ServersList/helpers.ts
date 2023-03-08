import {StatusCodes} from "../../models";
import {DefaultResponse} from '../../services/clients-service';
import {SubscriberWithImei} from '../../models/Subscriber';
import React from 'react';

export const getColorByStatusCode = (statusCode: StatusCodes) =>
    statusCode === StatusCodes.Success ? 'success' : 'error'
export const getPillStyle = (statusCode: StatusCodes) => ({
    backgroundColor: statusCode === StatusCodes.Success
        ? ''
        : 'rgb(209, 67, 67)',
    color: '#fff'
})

const emptyArray: SubscriberWithImei[] = []

export const useGetNewClients = (): typeof getNewClients => {

    const oldClientsRef = React.useRef<SubscriberWithImei[] | null | undefined>(null)

    const getNewClients = (response: DefaultResponse<SubscriberWithImei[]> | undefined): SubscriberWithImei[] => {
        if (!response || response.resultCode !== StatusCodes.Success) return emptyArray
        if (!oldClientsRef.current) {
            oldClientsRef.current = response.data
            return response.data
        }
        const haveDifferences = response.data.findIndex((dataItem, index) => {

            if (!oldClientsRef.current) return false

            return (dataItem?.imsi !== oldClientsRef.current[index]?.imsi ||
                dataItem?.extension !== oldClientsRef.current[index]?.extension ||
                dataItem?.imei !== oldClientsRef.current[index]?.imei)
        })

        const shouldUpdate = (response.data.length !== oldClientsRef.current.length || haveDifferences !== -1)
        if (shouldUpdate) {
            oldClientsRef.current = response.data
            return response.data
        }
        return oldClientsRef.current
    }
    return getNewClients
}
