import {Box, Button, CardContent, Divider, Grid, TextField} from "@mui/material";
import {Formik} from "formik";
import React, {FC} from "react";
import {FormSubmitFuncType} from "./index";
import {ConfigBodyNames, useGetBTSConfigQuery} from '../../../services/config-service';
import {EditBTSConfigFormValues} from './helpers';

interface Props {
    onSubmit: FormSubmitFuncType
}

const defaultInitialValues: EditBTSConfigFormValues = {
    band: ''
}

const Form: FC<Props> = ({onSubmit}) => {
    const {data: existingConfig} = useGetBTSConfigQuery('')
    const initialValues = React.useMemo<EditBTSConfigFormValues>(
        () => existingConfig ? existingConfig : defaultInitialValues,
        [existingConfig]
    )
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
                handleReset
              }) => (
                <form onSubmit={handleSubmit}>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the band"}
                                    label="Band"
                                    name={ConfigBodyNames.band}
                                    onChange={handleChange}
                                    value={values.band}
                                    variant="outlined"
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
                </form>
            )}
        </Formik>
    );
};

export default Form;