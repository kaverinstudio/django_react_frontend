import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllPortfolioFiles} from "../../../api/portfolio";
import BreadcrumbsComponent from "../../BreadcrumbsComponent";
import {getProducts} from "../../../api/products";
import {useParams} from "react-router-dom";
import {getPrices} from "../../../utils/cartProduct";


const ShopHeader = ({breadcrumbs, sortSelect}) => {
    const products = useSelector(state => state.products.initialProducts)
    const filterMass = useSelector(state => state.products)
    const params = useParams()

    let minPrice = 0
    let maxPrice = 0
    if (products){
        minPrice = getPrices(products, minPrice, maxPrice)[0]
        maxPrice = getPrices(products, minPrice, maxPrice)[1]
    }
    const [value, setValue] = useState([minPrice, maxPrice]);

    useEffect(()=>{
        setValue([minPrice, maxPrice])
    },[minPrice, maxPrice])

    const category = [
        {id: 0, category: 'популярные', sort: 'rating'},
        {id: 1, category: 'новинки', sort: 'create_at'},
        {id: 2, category: 'дешевле', sort: 'price'},
        {id: 3, category: 'дороже', sort: '-price'},
    ]

    const [select, setSelect] = useState(0)
    const dispatch = useDispatch()


    const selectCategorySelect = (event) => {
        setSelect(event.target.value)
        dispatch(getProducts(params.category, '', value[0], value[1], category[event.target.value].sort,
            filterMass.filterManufactured ? filterMass.filterManufactured.join() : '',
            filterMass.filterCategory ? filterMass.filterCategory.join() : ''))
        sortSelect(category[event.target.value].sort)
    }

    return (
        <Box sx={{flexGrow: 1, mt: 2, mb: 2}}>

            <Grid container spacing={2}>
                <Grid item sm={9} sx={{mt: 1}}>
                  <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
                </Grid>
                <Grid item sm={3} sx={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Typography sx={{lineHeight: 1.6, pr: 1}}>Сначала </Typography>
                    <FormControl variant="standard" sx={{minWidth: 120}} size="small">
                        <Select
                            id='category'
                            value={select}
                            onChange={selectCategorySelect}
                        >
                            {category?.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShopHeader;