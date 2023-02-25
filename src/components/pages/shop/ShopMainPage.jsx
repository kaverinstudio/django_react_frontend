import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../api/products";
import ShopHeader from "./ShopHeader";
import ShopSideBar from "./ShopSideBar";
import ProductList from "./ProductList";
import {Grid} from "@mui/material";
import {useParams} from "react-router-dom";

const ShopMainPage = () => {
    const category = useSelector(state => state.products.products)
    const dispatch = useDispatch()
    const params = useParams()

    let breadcrumbs = [
        {name: 'Каталог', link: '/products/'},
    ]

    if(params.category  && category){
        breadcrumbs = [...breadcrumbs, {name: category[0].category.category_name, link: `/products/${category[0].category.category_slug}/`}]
    }

    useEffect(()=>{
        dispatch(getProducts(params.category))
    },[params.category, dispatch])
    return (
        <>
            <ShopHeader breadcrumbs={breadcrumbs}/>
            <Grid container spacing={1}>
                <Grid item sm={2}>
                    <ShopSideBar/>
                </Grid>
                <Grid item sm={10}>
                    <ProductList/>
                </Grid>
            </Grid>
        </>
    );
};

export default ShopMainPage;