import React, {useEffect, useState} from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container, Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../assets/img/logos_google-photos.webp';
import Badge from "@mui/material/Badge";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../api/user";
import {getCart, getUserCart} from "../api/products";
import {cartProductCount} from "../utils/cartProduct";


const pages = [
    {name: 'Услуги', link: '/services/'},
    {name: 'Магазин', link: '/products/'},
    {name: 'Печать фотографий', link: '/print/'},
    {name: 'Портфолио', link: '/portfolio/'},
    {name: 'Контакты', link: '/contact/'}
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [cartCount, setCartCount] = useState(0)
    const cart = useSelector(state => state.products.cart)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

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

    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch(logout())
    }

    useEffect(() => {
        setCartCount(cartProductCount(cart))
    },[cart])

    useEffect(()=>{
        dispatch(getUserCart())
    },[])

  return (
    <AppBar className='header' position="static" sx={{color:'initial'}}>
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                  <Link key={page.link} to={page.link}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
                  </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignSelf: 'flex-end' }}>

              <Grid container sx={{display:'flex', flexDirection: 'column'}}>
                  <Grid item sx={{textAlign: 'center', paddingBottom: 2}}>
Информация о нас
                  </Grid>
                  <Grid item sx={{display:'flex', justifyContent: 'space-around', width: '100%'}}>
                      {pages.map((page) => (
                          <Link key={page.link} to={page.link}>
                          <Button className='header__button'

                              onClick={handleCloseNavMenu}
                              sx={{ display: 'block' }}
                          >
                              {page.name}
                          </Button>
                          </Link>
                      ))}
                  </Grid>

              </Grid>
          </Box>
          <Box sx={{ flexGrow: 0 , m: 2}}>
              <IconButton aria-label="cart">
                  <Badge badgeContent={cartCount} color="secondary">
                      <ShoppingCartIcon className='header__cart' />
                  </Badge>
              </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0, mt:2, mb:2, ml:2  }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={!!user ? user.username : 'N'} src={user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Link to='/login'>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Личный кабинет{!!user ? ' (' + user.username + ')' : ''}</Typography>
                    </MenuItem>
                </Link>
                <Link to='#'>
                    <MenuItem onClick={handleLogout}>
                        <Typography textAlign='center'>Выход</Typography>
                    </MenuItem>
                </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header