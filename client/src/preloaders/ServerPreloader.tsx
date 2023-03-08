import React from 'react';
import {Skeleton, TableCell, TableRow} from "@mui/material";

const ServerPreloader = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" width={66} height={24} />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" width={66} height={24} />
            </TableCell>
        </TableRow>
    );
};

export default ServerPreloader;