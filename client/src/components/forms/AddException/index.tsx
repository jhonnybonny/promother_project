import React from 'react';
import {Alert, Box, Card, CardHeader} from "@mui/material";
import Form from "./Form";
import { useAddExceptionMutation,} from '../../../services/config-service';
import {AddExceptionFormValues} from './helpers';
import ExceptionList from './ExceptionList';

export interface FormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
}
export type FormSubmitFuncType = (values: AddExceptionFormValues, formHelpers: FormHelpers) => void

const EditBTSConfigForm = () => {
    const [addException, {isError}] = useAddExceptionMutation()
    const onSubmit: FormSubmitFuncType = async (addExceptionFormValues, {setSubmitting, resetForm}) => {
        await addException(addExceptionFormValues)
        resetForm()
        setSubmitting(false)
    }
    return (
        <Box mb={3}>
            <Card>
                <CardHeader title="Add IMSI exception" />
                {isError &&
                    <Alert severity="error">
                        Can not add IMSI exception
                    </Alert>
                }
                <Card>
                    <Form onSubmit={onSubmit} />
                    <ExceptionList />
                </Card>
            </Card>
        </Box>
    );
};

export default EditBTSConfigForm;