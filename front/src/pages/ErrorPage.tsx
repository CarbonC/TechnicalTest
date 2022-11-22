import * as React from "react";
import { useRouteError } from "react-router-dom";
import { Grid, Typography } from '@mui/material';

function ErrorPage() {
    const error: any = useRouteError();

    return (
        <Grid container justifyContent={"center"} alignContent={"center"} style={{ minHeight: "100vh" }}>
            <Grid item>
                <Typography variant="h1">Oops!</Typography>
                <Typography variant="subtitle1">Sorry, an unexpected error has occurred.</Typography>
                <Typography variant="body2" >
                    <i>{error.statusText || error.message}</i>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ErrorPage;