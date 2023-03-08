import React, {FC} from 'react';
import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {Message, useGetCoordinatesQuery} from "../../services/coordinates-service";
import Typography from "@mui/material/Typography";
import {CardHeaderContent} from './CardHeaderContent';

interface Props {
    message: Message
    index: number
}

const SingleMessage: FC<Props> = ({message, index}) => {
    return (
        <div style={{marginBottom: '10px'}} className='center-flex'>
            <Typography
                fontSize='small'
                sx={{color: 'rgba(255, 255, 255, 0.4)'}}
                pr={2}
                mr={2}
                borderRight='solid 1px rgba(255,255,255, 0.3)'
            >
                {index.toString()}
            </Typography>
            <Typography
                sx={{color: 'rgb(20, 184, 166)'}}
                key={index + message.text}
            >
            {message.text}
            </Typography>
        </div>
)
}





const Coordinates = () => {
    const {data: consoleOut} = useGetCoordinatesQuery('')
    const consoleScroll = React.useRef<HTMLDivElement | null >(null)
    React.useEffect(
        () => {
            if(consoleScroll.current) {
                const availableScrollHeight = consoleScroll.current?.scrollHeight - consoleScroll.current?.offsetHeight - 32
                const scrolledUp = (consoleScroll.current.scrollTop + 70) < availableScrollHeight
                if (!scrolledUp) consoleScroll.current.scrollTop = consoleScroll.current.scrollHeight

            }
        },
        [consoleOut]
    )
    return (
        <Card sx={{mb: 3}}>
            <CardHeader title={<CardHeaderContent />} />
            <Divider />
            <CardContent
                ref={consoleScroll}
                className='console'
                sx={{ pb: 0 }}
            >
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12}>
                        {consoleOut && consoleOut.map( (message, index) =>
                            <SingleMessage
                                message={message}
                                index={index}
                                key={message.text + index}
                            />
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
        </Card>
        );
};

export default Coordinates;