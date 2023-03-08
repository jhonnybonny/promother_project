import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {SubscriberWithImei} from '../../../models/Subscriber';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useDeleteClientsMutation} from '../../../services/clients-service';
import {useGetExceptionsQuery} from '../../../services/config-service';

interface Props {
    client: SubscriberWithImei
}

const SingleClient = React.memo<Props>(({client}) => {
    const {id, imsi, extension, imei} = client
    const [deleteClient, {isError}] = useDeleteClientsMutation()
    const {data: exceptions} = useGetExceptionsQuery('')
    const handleDeleteClick = () => deleteClient(id)
    const isException = exceptions && exceptions.find( exception => exception === String(imsi) )
    return (
        <TableRow hover key={id} sx={{position: 'relative'}}>
            <TableCell>
                {id}
            </TableCell>
            <TableCell sx={{ color: isException ? '#f44336' : 'white'}}>
                {imsi}
            </TableCell>
            <TableCell>{extension}</TableCell>
            <TableCell>
                <div className='last-cell-item'>
                    {imei}
                    <DeleteForeverIcon
                        color='error'
                        cursor='pointer'
                        onClick={handleDeleteClick}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
});

export default SingleClient;