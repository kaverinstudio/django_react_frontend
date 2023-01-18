import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import Logo from "../assets/img/logos_google-photos.webp";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link} from "react-router-dom";

const Footer = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box className='footer'>
        <Container maxWidth="xl">
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