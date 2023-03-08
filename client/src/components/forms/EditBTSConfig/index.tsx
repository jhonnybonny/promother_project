import React from 'react';
import {Alert, Box, Card, CardHeader} from "@mui/material";
import Form from "./Form";
import {
    ConfigBody,
    ConfigBodyNames,
    useEditBTSConfigMutation
} from '../../../services/config-service';
import {EditBTSConfigFormValues} from './helpers';

export interface FormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
}
export type FormSubmitFuncType = (values: EditBTSConfigFormValues, formHelpers: FormHelpers) => void

const EditBTSConfigForm = () => {
    const [editConfig, {isError}] = useEditBTSConfigMutation()
    const onSubmit: FormSubmitFuncType = async (editConfigFormValues, {setSubmitting, resetForm}) => {
        const configBodyArray: ConfigBody[] = Object.keys(editConfigFormValues).map(
            key => ({
                name: key as ConfigBodyNames,
                valueToChange: editConfigFormValues[key as ConfigBodyNames.band]
            })
        )
        await editConfig(configBodyArray)
        resetForm()
        setSubmitting(false)
    }
    return (
        <Box mb={3}>
            <Card>
                <CardHeader title="Edit BTS config" />
                {isError &&
                    <Alert severity="error">
                        Can not edit BTS config
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