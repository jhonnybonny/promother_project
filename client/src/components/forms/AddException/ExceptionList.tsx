import React from 'react';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useGetExceptionsQuery, useRemoveExceptionMutation} from '../../../services/config-service';
import {StyledTypography} from '../../ServersList';


const ExceptionList = () => {
    const {data: exceptions} = useGetExceptionsQuery('')
    const [removeException] = useRemoveExceptionMutation()
    return (
        <div style={{padding: '20px'}}>
            {exceptions && exceptions.map( (item, index) => (
                <StyledTypography
                    key={item + index}
                    sx={{
                        display: 'inline-flex',
                        margin: '10px'
                    }}
                    className='update-icon'
                >
                    <div><span>{item}</span></div>
                    <DeleteForeverIcon
                        color='error'
                        onClick={() => removeException(item)}
                    />
                </StyledTypography>
            ))}
        </div>
    );
};

export default ExceptionList;