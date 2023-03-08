import React from 'react';
import {Alert, Box, Card, CardHeader} from "@mui/material";
import Form from "./Form";
import {SmsConfig, useEditSMSConfigMutation,} from '../../../services/config-service';

export interface FormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
}
export type FormSubmitFuncType = (values: SmsConfig, formHelpers: FormHelpers) => void

const EditBTSConfigForm = () => {
    const [editSmsConfig, {isError}] = useEditSMSConfigMutation()
    const onSubmit: FormSubmitFuncType = async (smsConfigFormValues, {setSubmitting}) => {
        await editSmsConfig(smsConfigFormValues)
        setSubmitting(false)
    }
    return (
        <Box mb={3}>
            <Card sx={{position: 'relative'}}>
                <CardHeader title="Edit SMS config" />
                {isError &&
                    <Alert severity="error">
                        Unable to edit SMS config
                    </Alert>
                }
                <Card>
                    <Form onSubmit={onSubmit} />
                </Card>
            </Card>
        </Box>
    );
};

export default EditBTSConfigForm;