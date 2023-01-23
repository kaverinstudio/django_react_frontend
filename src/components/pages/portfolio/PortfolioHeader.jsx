import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Logo from "../../../assets/img/logos_google-photos.webp";

const pages = [
    {name: 'Главная', link: '/'},
    {name: 'Услуги', link: '/services'},
    {name: 'Магазин', link: '/shop'},
    {name: 'Печать фотографий', link: '/print'},
    {name: 'Портфолио', link: '/portfolio'},
    {name: 'Контакты', link: '/contact'}
];

const PortfolioHeader = () => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignSelf: 'flex-end' }}>

            <Grid container sx={{display:'flex', flexDirection: 'column'}}>
                <Grid item sx={{textAlign: 'center', paddingBottom: 2}}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mt: 2,
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Наши работы
                    </Typography>
                </Grid>
                <Grid item sx={{display:'flex', justifyContent: 'space-around', width: '100%'}}>
                    {pages.map((page) => (
                        <Link key={page.link} to={page.link}>
                            <Button className='header__button'


                                    sx={{ display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                </Grid>

            </Grid>
        </Box>
    );
};

export default PortfolioHeader;