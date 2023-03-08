import {Box, Button} from '@mui/material';
import React from 'react';
import {
    useExecuteUnknownMutation,
    useKillProcessMutation,
    useResetDatabaseMutation,
    useStartProcessMutation
} from '../../services/coordinates-service';

export const CardHeaderContent = () => {
    const [startProcess, {isLoading: startIsLoading}] = useStartProcessMutation()
    const [killProcess, {isLoading: stopIsLoading}] = useKillProcessMutation()
    const [resetDatabase, {isLoading: resetIsLoading}] = useResetDatabaseMutation()
    const [executeUnknown, {isLoading: unknownIsLoading}] = useExecuteUnknownMutation()
    const startProcessOnCLick = () => startProcess('')
    const killProcessOnCLick = () => killProcess('')
    const resetDatabaseOnClick = () => resetDatabase('')
    const executeUnknownOnClick = () => executeUnknown('')
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            Process logs
            <div>
                <Button
                    color="error"
                    variant="contained"
                    type="submit"
                    disabled={resetIsLoading}
                    onClick={resetDatabaseOnClick}
                    sx={{mr: 2}}
                >
                    Reset database
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    type="submit"
                    disabled={stopIsLoading}
                    onClick={killProcessOnCLick}
                    sx={{mr: 2}}
                >
                    Stop
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={unknownIsLoading}
                    onClick={executeUnknownOnClick}
                    sx={{mr: 2}}
                >
                    Unknown
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={startIsLoading}
                    onClick={startProcessOnCLick}
                >
                    Start
                </Button>
            </div>
        </Box>
    )
}