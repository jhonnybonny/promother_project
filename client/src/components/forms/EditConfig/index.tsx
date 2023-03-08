import React from 'react';
import {Alert, Box, Card, CardHeader} from "@mui/material";
import Form from "./Form";
import {EditConfigFormValues} from "../../../models";
import {ConfigBody, ConfigBodyNames, useEditBSCConfigMutation} from '../../../services/config-service';

export interface FormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
}
export type FormSubmitFuncType = (values: EditConfigFormValues, formHelpers: FormHelpers) => void

const AddServerForm = () => {
    const [editConfig, {isError}] = useEditBSCConfigMutation()
    const onSubmit: FormSubmitFuncType = async (editConfigFormValues, {setSubmitting, resetForm}) => {

        const configBodyArray: ConfigBody[] = Object.keys(editConfigFormValues).map(
            key => ({
                name: key as ConfigBodyNames,
                valueToChange: editConfigFormValues[key as ConfigBodyNames]
            })
        )
        await editConfig(configBodyArray)
        resetForm()
        setSubmitting(false)
    }
    return (
        <Box mb={3}>
            <Card>
                <CardHeader title="Edit BSC config" />
                {isError &&
                    <Alert severity="error">
                        Can not edit BSC config
                    </Alert>
                }
                <Card>
                    <Form onSubmit={onSubmit} />
                </Card>
            </Card>
        </Box>
    );
};

export default AddServerForm;