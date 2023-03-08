import {Box, Button, CardContent, Divider, Grid, TextField} from "@mui/material";
import {Formik} from "formik";
import React, {FC} from "react";
import {initialValues} from "./helpers";
import {FormSubmitFuncType} from "./index";

interface Props {
    onSubmit: FormSubmitFuncType
}

const Form: FC<Props> = ({onSubmit}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
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
                                    helperText={"Please enter the IMSI exception"}
                                    label="IMSI exception"
                                    name='newException'
                                    onChange={handleChange}
                                    value={values.newException}
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