import React from 'react';
import {TableCell, tableHeadClasses, TableHead, TableRow, tableCellClasses} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    [`&.${tableHeadClasses.root}`]: {
        backgroundColor: theme.palette.background.paper,
    },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.text.primary,
    },
}));

const ClientsListHeader = () => {
    return (
        <StyledTableHead>
            <TableRow>
                <StyledTableCell>
                    ID
                </StyledTableCell>
                <StyledTableCell>
                    IMSI
                </StyledTableCell>
                <StyledTableCell>
                    EXTENSION
                </StyledTableCell>
                <StyledTableCell>
                    IMEI
                </StyledTableCell>
            </TableRow>
        </StyledTableHead>
    );
};

export default ClientsListHeader;