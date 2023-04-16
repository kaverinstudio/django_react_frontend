import React from 'react';
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Typography } from "@mui/material";

const BreadcrumbsComponent = ({ breadcrumbs }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" className='breadcrumb'>
            <Link
                underline="hover"
                color="inherit"
                href="/"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Главная
            </Link>
            {breadcrumbs?.length > 1 &&
                breadcrumbs.slice(0, -1).map(item =>
                    <Link
                        key={item.name}
                        underline="hover"
                        color="inherit"
                        href={item.link}
                    >
                        {item.name}
                    </Link>
                )
            }
            {breadcrumbs?.slice(-1).map(item => <Typography key={item.name} color="text.primary">{item.name}</Typography>)}
        </Breadcrumbs>
    );
};

export default BreadcrumbsComponent;