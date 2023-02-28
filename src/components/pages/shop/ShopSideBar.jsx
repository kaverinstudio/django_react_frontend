import React, {useEffect, useState} from 'react';
import {Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Input, Slider, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../api/products";
import {useParams} from "react-router-dom";
import {getPrices} from "../../../utils/cartProduct";
import {filterCategory, filterManufactured} from "../../../redux/slices/productSlice";


const minDistance = 100;

const ShopSideBar = ({sort}) => {
    const dispatch = useDispatch()
    const initialProducts = useSelector(state => state.products.initialProducts)
    const category = [...new Set(initialProducts?.map(item => item.category.category_name))]
    const manufactured = [...new Set(initialProducts?.map(item => item.manufactured))]

    const loadProduct = useSelector(state => state.products.products)
    const loadProductCategory = [...new Set(loadProduct?.map(item => item.category.category_name))]
    const loadProductManufactured = [...new Set(loadProduct?.map(item => item.manufactured))]

    const params = useParams()

    let minPrice = 0
    let maxPrice = 0
    if (initialProducts){
        minPrice = getPrices(initialProducts, minPrice, maxPrice)[0]
        maxPrice = getPrices(initialProducts, minPrice, maxPrice)[1]
    }
    const [value, setValue] = useState([minPrice, maxPrice]);


    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    const handleMinInputChange = (event) => {
        setValue([event.target.value === '' ? '' : Number(event.target.value), value[1]]);
    };
    const handleMaxInputChange = (event) => {
        setValue([value[0], event.target.value === '' ? '' : Number(event.target.value)]);
    };


    useEffect(()=>{
            setValue([minPrice, maxPrice])
    },[minPrice, maxPrice])


    const [filterMan, setFilterMan] = useState([])
    const [filterCat, setFilterCat] = useState([])

    const handleMinBlur = () => {
        if (value[0] < minPrice) {
            setValue([minPrice, value[1]]);
            dispatch(getProducts(params.category, '', minPrice, value[1], sort, filterMan.join(), filterCat.join()))
        } else if (value[0] > maxPrice) {
            setValue([maxPrice, value[1]]);
            dispatch(getProducts(params.category, '', maxPrice, value[1], sort, filterMan.join(), filterCat.join()))
        }
    };
    const handleMaxBlur = () => {
        if (value[1] < minPrice) {
            setValue([value[0], minPrice]);
            dispatch(getProducts(params.category, '', value[0], minPrice, sort, filterMan.join(), filterCat.join()))
        } else if (value[1] > maxPrice) {
            setValue([value[0], maxPrice]);
            dispatch(getProducts(params.category, '', value[0], maxPrice, sort, filterMan.join(), filterCat.join()))
        }
    };

    const handleManufacturedChecked = (event) => {
        if (event.target.checked){
            setFilterMan([...filterMan, event.target.name])
        }else {
            let newMan = filterMan.filter(item => item !== event.target.name)
            setFilterMan(newMan)
        }
    }

    const handleCategoryChecked = (event) => {
        if (event.target.checked){
            setFilterCat([...filterCat, event.target.name])
        }else {
            let newCat = filterCat.filter(item => item !== event.target.name)
            setFilterCat(newCat)
        }
    }

    useEffect(()=>{
        if (filterMan.length > 0 || filterCat.length > 0){
            console.log(filterMan.join())
            dispatch(getProducts(params.category, '', value[0], maxPrice, sort, filterMan ? filterMan.join() : '', filterCat ? filterCat.join() : ''))
            dispatch(filterManufactured(filterMan))
            dispatch(filterCategory(filterCat))
        }else {
            dispatch(getProducts(params.category))
            dispatch(filterManufactured(''))
            dispatch(filterCategory(''))
        }
    },[filterMan, filterCat])


    const onChangeCommittedHandler = (event, newValue) => {
        dispatch(getProducts(params.category, '', newValue[0], newValue[1], sort, filterMan.join()))

    }


    return (
        <>
            <Typography variant='h6'>Цена</Typography>
        <Box sx={{ width: '100%', pl:1, pr:1 }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                min={minPrice}
                max={maxPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                onChangeCommitted={onChangeCommittedHandler}
                disableSwap
            />
        </Box>
        <Grid container>
            <Grid item xs={4}>
                <Input
                    value={value[0]}
                    size="small"
                    onChange={handleMinInputChange}
                    onBlur={handleMinBlur}
                    inputProps={{
                        step: 10,
                        min: minPrice,
                        max: maxPrice,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
            <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Divider variant='middle'/>
            </Grid>
            <Grid item xs={4}>
                <Input
                    value={value[1]}
                    size="small"
                    onChange={handleMaxInputChange}
                    onBlur={handleMaxBlur}
                    inputProps={{
                        step: 10,
                        min: minPrice,
                        max: maxPrice,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
        </Grid>
            <Box sx={{ width: '100%', mt: 2}}>
                <Typography variant='h6'>Категории</Typography>
                <FormGroup>
                    {
                        category?.map(cat =>
                            <FormControlLabel key={cat} control={<Checkbox onChange={handleCategoryChecked} disabled={!loadProductCategory.includes(cat)} name={cat}/>} label={cat} />
                        )}
                </FormGroup>
            </Box>
            <Box sx={{ width: '100%', mt: 2}}>
                <Typography variant='h6'>Производитель</Typography>
                <FormGroup>
                    {
                        manufactured?.map(man =>
                        <FormControlLabel key={man} control={<Checkbox onChange={handleManufacturedChecked} disabled={!loadProductManufactured.includes(man)} name={man} />} label={man} />
                    )}
                </FormGroup>
            </Box>
        </>
    );
};

export default ShopSideBar;