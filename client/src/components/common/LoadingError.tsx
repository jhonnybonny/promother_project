import React, {FC} from 'react';
import {Typography} from "@mui/material";

interface Props {
    errorText: string
    refetch: () => void
}

const LoadingError: FC<Props> = ({errorText, refetch}) => {
    const handleClick = () => refetch()
    return (
        <Typography
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='20vh'
            flexDirection='column'
            width='100%'
            component='div'
        >
            {errorText}
            <br/>
            <div
                style={{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                Try again
            </div>
        </Typography>
    );
};

export default LoadingError;