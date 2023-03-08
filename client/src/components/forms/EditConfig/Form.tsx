import {Box, Button, CardContent, Divider, Grid, TextField} from "@mui/material";
import {Formik} from "formik";
import React, {FC} from "react";
import {FormSubmitFuncType} from "./index";
import {ConfigBodyNames, useGetBSCConfigQuery} from '../../../services/config-service';
import {EditConfigFormValues} from '../../../models';

interface Props {
    onSubmit: FormSubmitFuncType
}

export const defaultInitialValues: EditConfigFormValues = {
    NCC: '',
    MNC: '',
    shortName: '',
    longName: '',
    band: '',
    CID: '',
    LAC: '',
    BSID: '',
    ARFCN: '',
}

const Form: FC<Props> = ({onSubmit}) => {
    const {data: existingConfig} = useGetBSCConfigQuery('')
    const initialValues = React.useMemo<EditConfigFormValues>(
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
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the NCC"}
                                    label={ConfigBodyNames.NCC}
                                    name={ConfigBodyNames.NCC}
                                    onChange={handleChange}
                                    value={values.NCC}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the MNC"}
                                    label={ConfigBodyNames.MNC}
                                    name={ConfigBodyNames.MNC}
                                    onChange={handleChange}
                                    value={values.MNC}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={3}>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the short name"}
                                    label="Short name"
                                    name={ConfigBodyNames.shortName}
                                    onChange={handleChange}
                                    value={values.shortName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the long name"}
                                    label="Long name"
                                    name={ConfigBodyNames.longName}
                                    onChange={handleChange}
                                    value={values.longName}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={3}>
                            <Grid item lg={6} md={12} xs={6}>
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
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the CID"}
                                    label={ConfigBodyNames.CID}
                                    name={ConfigBodyNames.CID}
                                    onChange={handleChange}
                                    value={values.CID}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={3}>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the LAC"}
                                    label="LAC"
                                    name={ConfigBodyNames.LAC}
                                    onChange={handleChange}
                                    value={values.LAC}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item lg={6} md={12} xs={6}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the BSID"}
                                    label={ConfigBodyNames.BSID}
                                    name={ConfigBodyNames.BSID}
                                    onChange={handleChange}
                                    value={values.BSID}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    helperText={"Please enter the ARFCN"}
                                    label="ARFCN"
                                    name={ConfigBodyNames.ARFCN}
                                    onChange={handleChange}
                                    value={values.ARFCN}
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