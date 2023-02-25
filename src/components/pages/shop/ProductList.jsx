import React from 'react';
import {Box, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const products = useSelector(state => state.products.products)
    const photos = useSelector(state => state.products.photos)


    return (
        <Box gap={1} sx={{display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr)) !important', mb: 2}}>
            {products?.map(product =>
                <Box key={product.id} sx={{height: 500}}>
                    <ProductCard product={product} photos={photos.filter(photo => photo.for_product === product.id)}/>
                </Box>

            )}
        </Box>
    );
};

export default ProductList;