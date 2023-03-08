import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import LoadingError from '../common/LoadingError';
import ServerPreloader from '../../preloaders/ServerPreloader';
import MultiplyPreloader from '../../preloaders';
import {SubscriberWithImei} from '../../models/Subscriber';
import SingleServer from './SingleClient';

interface Props {
    isError: boolean
    clients: SubscriberWithImei[] | undefined
    isFetching: boolean
    isLoading: boolean
    refetch: () => void
}

const propsAreEqual = (prevProps: Props, nextProps: Props) => {
    return prevProps.clients === nextProps.clients
}

const List = React.memo<Props>(({
    isError, isFetching, clients, isLoading, refetch
}) => {
    return (
        <TableBody >
            {/* Clinets list */}
            {!isError && clients && clients.map( (client) => (
                <SingleServer
                    key={client.id}
                    client={client}
                />
            ))}

            {/* Handle error */}
            {isError && !isFetching &&
                <TableRow>
                    <TableCell>
                        <LoadingError
                            errorText='Can not load clients list'
                            refetch={() => {}}
                        />
                    </TableCell>
                </TableRow>
            }

            {/* Handle loading state */}
            {isFetching && <ServerPreloader />}

            {isLoading &&
                <MultiplyPreloader itemsNumber={5}>
                    <ServerPreloader />
                </MultiplyPreloader>
            }
        </TableBody>
    );
}, propsAreEqual);

export default List;