import {Box, Button, CardContent, Divider, Grid, TextField, Typography} from "@mui/material";
import {Formik} from "formik";
import React, {FC} from "react";
import {FormSubmitFuncType} from "./index";
import {SmsConfig, useGetSMSConfigQuery} from '../../../services/config-service';
import ReplayIcon from '@mui/icons-material/Replay';
import Switcher from './Switcher';

interface Props {
    onSubmit: FormSubmitFuncType
}

type SetFieldValueFuncType = (field: string, value: any, shouldValidate?: (boolean | undefined)) => void

const Form: FC<Props> = ({onSubmit}) => {

    const {data: existingConfig} = useGetSMSConfigQuery('')
    const [initialValues, setInitialValues] = React.useState<SmsConfig>(
        {enabled: false, senderName: '', message: ''}
    )

    React.useEffect(() => {
        if (!existingConfig) return
        const haveDifference = existingConfig.message !== initialValues.message ||
            existingConfig.senderName !== initialValues.senderName ||
            existingConfig.enabled !== initialValues.enabled
       if (haveDifference) setInitialValues(existingConfig)
    }, [existingConfig])

    const handleSwitcherClick = (values: SmsConfig, setFiledValue: SetFieldValueFuncType) => {
        setFiledValue('enabled', !values.enabled)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                handleReset,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit}>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3} mb={3}>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the sender name"}
                                    label="Sender name"
                                    name='senderName'
                                    onChange={handleChange}
                                    value={values.senderName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the message"}
                                    label="Message"
                                    name='message'
                                    onChange={handleChange}
                                    value={values.message}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{mr: 2}} component='span'>
                                    Enabled:
                                </Typography>
                                <Switcher
                                    enabled={values.enabled}
                                    handleClick={() => handleSwitcherClick(values, setFieldValue)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="warning"
                            variant="outlined"
                            sx={{mr: 2}}
                            onClick={handleReset}
                            disabled={isSubmitting}
                        >
                            Reset form
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Confirm config edit
                        </Button>
                    </Box>
                    <div className="update-icon absolute">
                        <ReplayIcon onClick={handleReset}/>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Form;