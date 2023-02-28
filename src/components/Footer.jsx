import React from 'react';
import {
    Box,
    Container,
    Grid,
    Toolbar,
    Typography
} from "@mui/material";
import Logo from "../assets/img/logos_google-photos.webp";
import {Link} from "react-router-dom";

const Footer = () => {

    return (
        <Box className='footer'>
        <Container maxWidth="lg">
            <Toolbar disableGutters>
                <Link to='/'>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <div className="header__logo">
                        <img src={Logo} alt="logo"/>
                        <div>
                            <h1>ФОТО №1</h1>
                            <p>Ваша фотостудия</p>
                        </div>
                    </div>
                </Typography>
                </Link>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignSelf: 'center' }}>
                    <Grid container sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Grid item sx={{textAlign: 'center'}}>
                            Информация о нас
                        </Grid>
                        <Grid item sx={{textAlign: 'center'}}>
                            Информация о нас
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 0, mt:2, mb:2, ml:2  }}>
                    Информация о нас
                </Box>
            </Toolbar>
        </Container>
        </Box>
    );
};

export default Footer;