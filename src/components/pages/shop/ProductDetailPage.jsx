import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { addProductToCart } from "../../../api/products";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Button,
    CardMedia,
    Divider,
    Grid,
    ImageList,
    ImageListItem, Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../api/config";
import { RotatingLines } from "react-loader-spinner";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import BreadcrumbsComponent from '../../BreadcrumbsComponent';
import { formatDate } from "../../../utils/formatDate";
import { previewText } from "../../../utils/previewText";
import ModalReview from "./ModalReview";
import ModalSendReview from "./ModalSendReview";
import Alert from "../../Alert";

const ProductDetailPage = () => {
    const status = useSelector(state => state.files.errors)
    const [product, setProduct] = useState(null)
    const [mainPhoto, setMainPhoto] = useState(null)
    const [count, setCount] = useState(1)
    const user = useSelector(state => state.auth.user)
    const params = useParams()
    const dispatch = useDispatch()

    const [openReview, setOpenReview] = useState(false);
    const [reviewItem, setReviewItem] = useState([]);

    const handleClickOpenReview = (actualReview) => {
        setOpenReview(true);
        setReviewItem(actualReview);
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

    const [openSendReview, setOpenSendReview] = useState(false)

    const handleClickOpenSendReview = () => {
        setOpenSendReview(true);
    };

    const handleCloseSendReview = () => {
        setOpenSendReview(false);
    };

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
                                <ImageListItem className='product-detail__image-list' key={image.id}
                                    sx={{ height: '100% !important' }}>
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
                        <Typography className='product-detail__title'
                            variant='h4'>{product.products.product_name}</Typography>
                    </Box>
                    <Grid container spacing={2} mt={0.5}>
                        <Grid item sm={4}>
                            <Rating name="half-rating" precision={0.5} value={product.products.rating} readOnly />
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption'>Просмотров {product.products.view_count}</Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption'
                                sx={{ color: product.products.available ? 'green' : 'red' }}>{product.products.available ? 'В наличии' : 'Нет в наличии'}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center' }} component='div'>
                        <Typography variant='h6' sx={{
                            textAlign: 'center',
                            pt: 2,
                            pb: 2
                        }}>Цена: {parseInt(product.products.price).toLocaleString('ru-RU')} </Typography><CurrencyRubleIcon
                            sx={{ fontSize: '1.1rem' }} />
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
                            <Button variant='contained'
                                onClick={() => addToCartHandler(product.products.id, user, count)}
                                sx={{ display: 'block', mt: 2 }}
                            >
                                Купить
                            </Button>
                        </Grid>
                    </Grid>
                    <Box component='div' sx={{ mt: 2 }}>
                        <Divider />
                        <Box component='div' sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Box component='div'>
                                <Typography className='product-detail__title' variant='h6'>Отзывы:</Typography>
                            </Box>
                            <Box component='div'>
                                <Button
                                    variant={"outlined"}
                                    color={"success"}
                                    size={"small"}
                                    onClick={handleClickOpenSendReview}
                                >Оставить отзыв</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box component='div'>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {product.reviews.map((review) => {

                                return (
                                    <ListItem key={review.id} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={review.user_name} src={review.user_avatar ? review.user_avatar : review.user_name} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={review.user_name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component='span'
                                                        variant='body2'
                                                        color='text.primary'
                                                    >
                                                        {formatDate(review.date)}
                                                    </Typography>
                                                    {' - ' + previewText(review.review_text)}
                                                    {review.review_text.length > 140 && <Link onClick={() => handleClickOpenReview(review)} sx={{ cursor: 'pointer' }}>далее</Link>}

                                                </React.Fragment>
                                            }
                                        />
                                        <ModalReview
                                            open={openReview}
                                            close={handleCloseReview}
                                            review={reviewItem}
                                            onClose={handleCloseReview}
                                        />
                                    </ListItem>
                                )
                            }
                            )}
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <ModalSendReview open={openSendReview} close={handleCloseSendReview} product={product.products} />
            <Alert link="" status={status} message={`Ваш отзыв отправлен на модерацию`} icon={'success'} relink={false} logout={false} />
        </>
    );
};

export default ProductDetailPage;