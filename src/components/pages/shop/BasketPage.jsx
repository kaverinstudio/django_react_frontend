import React from 'react';
import {Box, Button, CardMedia, Grid, Typography} from "@mui/material";
import PageHeader from "../../PageHeader";
import BasketTableComponent from "./BasketTableComponent";
import {useSelector} from "react-redux";
import EmptyCart from "../../../assets/img/empty-cart.svg";
import {Link} from "react-router-dom";

const BasketPage = () => {
    const products = useSelector(state => state.products.cart?.product)
    const photos = useSelector(state => state.products.cart?.photos)

    let breadcrumbs = [
        {name: 'Каталог', link: '/products/'},
        {name: 'Корзина', link: '/cart/'},
    ]


    if (!products?.length >0){
        return (
            <div>
                <PageHeader breadcrumbs={breadcrumbs}/>
                <Typography variant='h6' sx={{pb: 1}}>Моя корзина</Typography>
                <Grid container className="basket-empty">
                    <Grid item sm={12} sx={{p: 1, display: 'flex', justifyContent: 'center'}}>
                        <Box className='basket-empty__image-wrapper'>
                            <CardMedia
                                className='basket-empty__image'
                                component="img"
                                sx={{ width: '100%' }}
                                image={EmptyCart}
                                alt='Empty Basket'
                            />
                        </Box>
                    </Grid>
                    <Grid item sm={12} sx={{textAlign: 'center', p: 1}}>
                        <Typography variant='h4' sx={{p: 2}} className='basket-empty__title'>Ваша корзина пуста</Typography>
                    </Grid>
                    <Grid item sm={12} sx={{textAlign: 'center', p: 1}}>
                        <Typography variant='caption' sx={{textAlign: 'center', p: 2}}>Добавьте в нее товары из каталога</Typography>
                    </Grid>
                    <Grid item sm={12} sx={{textAlign: 'center', p: 1}}>
                        <Link to='/products/'>
                        <Button variant='contained'>Перейти в каталог</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <>
            <PageHeader breadcrumbs={breadcrumbs}/>
            <BasketTableComponent products={products} photos={photos}/>
        </>
    );
};

export default BasketPage;