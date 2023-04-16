import React from 'react';
import {Box, CardMedia, Divider, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserCart, updateUserCart} from "../../../api/products";

const BasketItem = ({product, photo}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const handleAddProduct = (id) => {
        let count = product.product_count + 1
        dispatch(updateUserCart(user, id, count))
    }

    const handleRemoveProduct = (id) => {
        let count = product.product_count - 1
        if (count < 1){
            count = 1
        }
        dispatch(updateUserCart(user, id, count))
    }

    const handleDeleteProduct = (id) => {
        dispatch(deleteUserCart(user, id))
    }

    return (
        <>
            <Grid container className="basket-item">
                <Grid item sm={6} className="basket-item__image-block">
                    <Box className='basket-item__image-wrapper'>
                        <CardMedia
                            className='basket-item__image'
                            component="img"
                            sx={{ width: '100%' }}
                            image={photo[0].photo}
                            alt={product.product.product_name}
                        />
                    </Box>
                    <Box className="basket-item__text-wrapper">
                        <Link to={'/products/' + product.product.category?.category_slug + '/' + product.product?.product_slug + '/'}>
                        <Typography variant="subtitle2" className="basket-item__title">{product.product.product_name}</Typography>
                        </Link>
                        <Typography variant='caption' sx={{color: product.product.available ? 'green' : 'red'}} >{product.product.available ? 'В наличии' : 'Нет в наличии'}</Typography>
                    </Box>
                </Grid>
                <Grid item sm={2} sx={{textAlign: 'center'}}>
                    <Box className="basket-item__count-wrapper">
                        <Box className="basket-item__count-button" onClick={() => handleRemoveProduct(product.id)}>
                            <RemoveIcon/>
                        </Box>
                        <Box>
                            <Typography>{product.product_count}</Typography>
                        </Box>
                        <Box className="basket-item__count-button" onClick={() => handleAddProduct(product.id)}>
                            <AddIcon/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant='subtitle1' sx={{textAlign: 'center'}}>{parseInt(product.product_count * product.product.price).toLocaleString('ru-RU')} </Typography><CurrencyRubleIcon sx={{fontSize: '1rem'}} />
                </Grid>
                <Grid item sm={2} sx={{textAlign: 'center'}}>
                    <IconButton aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>

            </Grid>
            <Divider sx={{pt: 2}}/>
        </>
    );
};

export default BasketItem;