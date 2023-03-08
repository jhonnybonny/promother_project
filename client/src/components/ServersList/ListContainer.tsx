import React from 'react';
import {useGetClientsQuery} from '../../services/clients-service';
import List from './List';
import {useGetNewClients} from './helpers';


const ListContainer = () => {
    const getNewClients = useGetNewClients()
    const {clients, isError, isLoading, isFetching, refetch} = useGetClientsQuery('', {
        pollingInterval: 1000,
        selectFromResult: ({data, isError, isLoading, isFetching}) => {
            return ({
                clients: getNewClients(data),
                isError,
                isLoading,
                isFetching,

            })
        }
    })

    return (
        <List
           isFetching={isFetching}
           isLoading={isLoading}
           isError={isError}
           clients={clients}
           refetch={refetch}
        />
    );
};

export default ListContainer;