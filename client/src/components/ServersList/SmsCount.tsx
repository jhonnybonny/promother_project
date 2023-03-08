import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import {Tooltip} from '@mui/material';
import {StyledTypography} from './index';
import {useGetSmsCountQuery} from '../../services/clients-service';
import {StatusCodes} from '../../models';

const SmsCount = () => {
    const {data: smsCount, refetch} = useGetSmsCountQuery('', {pollingInterval: 3000})
    const getTotalCount = () => {
        if (!smsCount || smsCount.data.count === 0 || smsCount.resultCode === StatusCodes.Error) return 0
        return Math.ceil(smsCount.data.count / 2)
    }
    return (
        <Tooltip title='Update sms count'>
            <StyledTypography
                fontSize='large'
                className='update-icon absolute'
            >
                <div>
                    Total SMS count:
                    <span
                        style={{
                            marginRight: '20px',
                            paddingRight: '20px',
                            borderRight: '1px solid white'
                        }}
                        className="text"
                    >
                        {getTotalCount()}
                    </span>
                    Total is reports:
                    {smsCount?.data.count &&
                        <span className="text">
                            {smsCount?.data.isReport}
                        </span>
                    }
                </div>
                <ReplayIcon onClick={refetch}/>
            </StyledTypography>
        </Tooltip>
    );
};

export default SmsCount;