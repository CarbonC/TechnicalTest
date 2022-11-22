import * as React from "react";
import { Grid } from "@mui/material";
import DataTable from "../components/datatable/DataTable";

function Root() {

    return (
        <Grid container justifyContent={"center"} style={{ minHeight: "100vh", marginTop: "5vh" }}>
            <DataTable />
        </Grid>
    )
}

export default Root;