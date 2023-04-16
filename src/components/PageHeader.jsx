import React from 'react';
import {Box, Grid} from "@mui/material";
import BreadcrumbsComponent from "./BreadcrumbsComponent";

const PageHeader = ({breadcrumbs}) => {
    return (
        <Box sx={{flexGrow: 1, mt: 2, mb: 2}}>
            <Grid container spacing={2}>
                <Grid item sm={9} sx={{mt: 1}}>
                    <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PageHeader;