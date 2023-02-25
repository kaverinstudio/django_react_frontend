import React, {useState} from 'react';
import {Box, Breadcrumbs, Button, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllPortfolioFiles} from "../../../api/portfolio";
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BreadcrumbsComponent from "../../BreadcrumbsComponent";


const PortfolioHeader = ({breadcrumbs}) => {
    const category = useSelector(state => state.portfolio.category)
    const [select, setSelect] = useState(0)
    const dispatch = useDispatch()

    const selectCategory = (cat) => {
        setSelect(cat)
        dispatch(getAllPortfolioFiles(cat))
    }

    const allCategory = () => {
        setSelect(0)
        dispatch(getAllPortfolioFiles())
    }

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
                    <FormControl variant="standard" sx={{minWidth: 180}} size="small">
                        <Select
                        id='category'
                        value={select}
                        onChange={selectCategorySelect}
                        >
                        <MenuItem value={0}>Все категории</MenuItem>
                            {category?.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/*<Grid item sx={{display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around', width: '100%', mb: 2}}>*/}
                {/*    <Button className='header__button'*/}
                {/*            variant={select === 0 ? 'contained' : 'outlined'}*/}
                {/*            sx={{ display: 'block' }}*/}
                {/*            onClick={allCategory}*/}
                {/*    >*/}
                {/*        Все категории*/}
                {/*    </Button>*/}
                {/*    {category?.map((cat) => (*/}
                {/*            <Button key={cat.id} className='header__button'*/}
                {/*                    variant={cat.id === select ? 'contained' : 'outlined'}*/}
                {/*                    sx={{ display: 'block' }}*/}
                {/*                    onClick={() => selectCategory(cat.id)}*/}
                {/*            >*/}
                {/*                {cat.category}*/}
                {/*            </Button>*/}
                {/*    ))}*/}
                {/*</Grid>*/}
            </Grid>
         </Box>
    );
};

export default PortfolioHeader;