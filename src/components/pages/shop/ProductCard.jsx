import React from 'react';
import {Box, Card, CardMedia, Typography, Rating, Button} from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../../../api/products";

const ProductCard = ({product, photos}) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()


    const addToCartHandler = (productId, user, count) => {
        dispatch(addProductToCart(productId, user, count))
    }


    return (
        <Card className='product-card'>
            <Link to={'/products/' + product.category?.category_slug + '/' + product?.product_slug + '/'}>
            <Box className='product-card__top-block'>
            <Box className='product-card__image-wrapper'>
            <CardMedia
                className='product-card__image'
                component="img"
                sx={{ width: '100%' }}
                image={photos[0]?.photo}
                alt={product?.product_name}
            />
            </Box>
            <Rating name="half-rating" precision={0.5} value={product?.rating} readOnly sx={{pt: 2}}/>
            <Typography variant='h6' className='product-card__title'>{product?.product_name}</Typography>
            </Box>
            </Link>
            <Box className='product-card__bottom-block'>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant='h6' sx={{textAlign: 'center', pt: 2, pb: 2}}>Цена: {parseInt(product?.price).toLocaleString('ru-RU')} </Typography><CurrencyRubleIcon sx={{fontSize: '1.1rem'}}/>
            </Box>

            <Button variant='contained' onClick={()=>addToCartHandler(product?.id, user, 1)}
                    sx={{ display: 'block', mt: 2 }}
            >
                Купить
            </Button>
            </Box>
        </Card>
    );
};

export default ProductCard;