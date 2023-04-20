import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { addProductToCart } from "../../../api/products";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    CardMedia,
    Divider,
    Grid,
    ImageList,
    ImageListItem,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../api/config";
import { RotatingLines } from "react-loader-spinner";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import BreadcrumbsComponent from '../../BreadcrumbsComponent';

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null)
    const [mainPhoto, setMainPhoto] = useState(null)
    const [count, setCount] = useState(1)
    const user = useSelector(state => state.auth.user)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        async function getProduct() {
            try {
                const { data } = await axios.get(`${API_URL}api/products/${params.category}/${params.slug}/`)
                setProduct(data)
                setMainPhoto(data.photos[0].photo)
            } catch (e) {
                console.log(e)
            }
        }
        getProduct();
    }, [])

    const handleChangeCount = (event) => {
        setCount(event.target.value)
    }

    const changeMainPhotoHandler = (image) => {
        setMainPhoto(image)
    }

    const addToCartHandler = (productId, user, count) => {
        dispatch(addProductToCart(productId, user, count))
    }

    if (!product) {
        return (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%' }} component='div'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </Box>
        )
    }

    const breadcrumbs = [
        { name: 'Каталог', link: '/products/' },
        { name: product.products.category.category_name, link: `/products/${params.category}/` },
        { name: product.products.product_name, link: `/products/${params.category}/${params.slug}/` },
    ]

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }} component='div'>
                <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            </Box>
            <Grid container spacing={4} className='product-detail' sx={{ mb: 2 }}>
                <Grid item sm={6}>
                    <Box className='product-detail__image-wrapper' component='div'>
                        <CardMedia
                            className='product-detail__image'
                            component="img"
                            sx={{ width: '100%' }}
                            image={mainPhoto}
                            alt={product.products.product_name}
                        />
                    </Box>
                    <Box component='div'>
                        <ImageList
                            gap={12}
                            sx={{
                                mt: 1,
                                gridTemplateColumns:
                                    'repeat(auto-fill, minmax(100px, 1fr)) !important'
                            }}
                        >
                            {product.photos.map(image =>
                                <ImageListItem className='product-detail__image-list' key={image.id} sx={{ height: '100% !important' }}>
                                    <img
                                        style={{ overflow: 'hidden' }}
                                        src={`${image.photo}?w=100&h=100&fit=crop&auto=format`}
                                        srcSet={`${image.photo}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                                        loading="lazy"
                                        decoding='async'
                                        onClick={() => changeMainPhotoHandler(image.photo)}
                                        alt=''
                                    />
                                </ImageListItem>
                            )}

                        </ImageList>
                    </Box>
                </Grid>
                <Grid item sm={6}>
                    <Box component='div'>
                        <Typography className='product-detail__title' variant='h4'>{product.products.product_name}</Typography>
                    </Box>
                    <Grid container spacing={2} mt={0.5}>
                        <Grid item sm={4}>
                            <Rating name="half-rating" precision={0.5} value={product.products.rating} readOnly />
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption'>Просмотров {product.products.view_count}</Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption' sx={{ color: product.products.available ? 'green' : 'red' }} >{product.products.available ? 'В наличии' : 'Нет в наличии'}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center' }} component='div'>
                        <Typography variant='h6' sx={{ textAlign: 'center', pt: 2, pb: 2 }}>Цена: {parseInt(product.products.price).toLocaleString('ru-RU')} </Typography><CurrencyRubleIcon sx={{ fontSize: '1.1rem' }} />
                    </Box>
                    <Box component='div'>
                        <Typography variant='body1'>{product.products.description}</Typography>
                    </Box>
                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <TextField
                                sx={{ mt: 2 }} size="small"
                                type='number'
                                id="count"
                                label="Количество"
                                variant="outlined"
                                value={count}
                                onChange={handleChangeCount}
                                inputProps={{ inputMode: 'numeric', min: 1 }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <Button variant='contained' onClick={() => addToCartHandler(product.products.id, user, count)}
                                sx={{ display: 'block', mt: 2 }}
                            >
                                Купить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductDetailPage;