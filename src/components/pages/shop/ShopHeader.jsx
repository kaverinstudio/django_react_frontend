import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllPortfolioFiles} from "../../../api/portfolio";
import BreadcrumbsComponent from "../../BreadcrumbsComponent";


const ShopHeader = ({breadcrumbs}) => {
    const category = [
        {id: 0, category: 'популярные'},
        {id: 1, category: 'новинки'},
        {id: 2, category: 'дешевле'},
        {id: 3, category: 'дороже'},
    ]

    const [select, setSelect] = useState(0)
    const dispatch = useDispatch()


    const selectCategorySelect = (event) => {
        setSelect(event.target.value)
        dispatch(getAllPortfolioFiles(event.target.value === 0 ? '' : event.target.value))
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