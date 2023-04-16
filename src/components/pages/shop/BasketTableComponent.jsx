import React from 'react';
import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import BasketItem from "./BasketItem";
import {useDispatch, useSelector} from "react-redux";
import {totalCartSum} from "../../../utils/cartProduct";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import {deleteAllProductInCart} from "../../../api/products";
import {Link} from "react-router-dom";


const BasketTableComponent = ({products, photos}) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const sale = 7

    const allDeleteHandler = () => {
        dispatch(deleteAllProductInCart(user))
    }

    return (
        <div>
            <Typography variant='h6' sx={{pb: 1}}>Моя корзина</Typography>
            <Grid container spacing={2}>
                <Grid item sm={9}>
                    <Grid container className="basket-top">
                        <Grid item sm={6} className="basket-top__item" sx={{p: 1}}>
                            <Typography variant='caption' sx={{p: 2}} >Товар</Typography>
                        </Grid>
                        <Grid item sm={2} sx={{textAlign: 'center', p: 1}}>
                            <Typography variant='caption' sx={{textAlign: 'center', p: 2}}>Количество</Typography>
                        </Grid>
                        <Grid item sm={2} sx={{textAlign: 'center', p: 1}}>
                            <Typography variant='caption' sx={{textAlign: 'center', p: 2}}>Сумма</Typography>
                        </Grid>
                        <Grid item sm={2} sx={{textAlign: 'center', p: 1}}>
                            <Typography onClick={allDeleteHandler} variant='caption' sx={{textAlign: 'center', p: 2, cursor: 'pointer'}}>Удалить все</Typography>
                        </Grid>
                    </Grid>
                    {products?.map(product =>
                        <BasketItem key={product.id} product={product} photo={photos?.filter(item => item.for_product === product.product.id)}/>
                    )}
                </Grid>
                <Grid item sm={3} className='basket-total'>
                    <Box className='basket-total__wrapper'>
                    <Box sx={{p: 2}}>
                        <Typography variant='caption'>Итого</Typography>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant='h5'>{totalCartSum(products)?.toLocaleString('ru-RU')}</Typography><CurrencyRubleIcon sx={{fontSize: '1.2rem'}} />
                        </Box>
                        <Divider sx={{pt: 1}}/>
                    </Box>
                        <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                            <Typography variant='caption'>Стоимость товаров</Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant='h6'>{totalCartSum(products)?.toLocaleString('ru-RU')}</Typography><CurrencyRubleIcon sx={{fontSize: '1.2rem'}} />
                            </Box>
                        </Box>
                        <Box sx={{pl: 2, pr: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                                <Typography variant='caption'>Сумма скидки</Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}} textAlign="end">
                                <Typography variant='h6'>{(totalCartSum(products) * sale / 100)?.toLocaleString('ru-RU')}</Typography><CurrencyRubleIcon sx={{fontSize: '1.2rem'}} />
                            </Box>
                        </Box>
                        <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                                <Typography variant='caption'>Итого без учета доставки</Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}} textAlign="end">
                                <Typography variant='h6'>{parseInt(totalCartSum(products) - (totalCartSum(products) * sale / 100))?.toLocaleString('ru-RU') }</Typography><CurrencyRubleIcon sx={{fontSize: '1.2rem'}} />
                            </Box>
                        </Box>
                        <Box sx={{pl: 2, pr: 2}}>
                            <Divider/>
                        </Box>
                        <Box sx={{p: 2, display: 'flex', justifyContent: 'center',}}>
                            <Link to="/cart/confirm/">
                            <Button variant='contained'>Оформить заказ</Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default BasketTableComponent;