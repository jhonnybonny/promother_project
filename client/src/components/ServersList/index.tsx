import React from 'react';
import {Box, Card, CardHeader, Table, Typography, typographyClasses,} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import ClientsListHeader from "./ClientsListHeader";
import ListContainer from "./ListContainer";
import {styled} from '@mui/material/styles';
import SmsCount from './SmsCount';


export const StyledTypography = styled(Typography)(({ theme }) => ({
    [`&.${typographyClasses.root}`]: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text
    },
}));

const ServersList = () => {
    return (
        <Card sx={{position: 'relative'}}>
            <CardHeader title="Clients list" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <ClientsListHeader />
                        <SmsCount />
                        <ListContainer />
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

export default ServersList;