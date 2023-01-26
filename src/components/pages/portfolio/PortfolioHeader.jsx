import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllPortfolioFiles} from "../../../api/portfolio";


const PortfolioHeader = () => {
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
        <Box sx={{ flexGrow: 1, display: 'flex', alignSelf: 'flex-end' }}>

            <Grid container sx={{display:'flex', flexDirection: 'column'}}>
                <Grid item sx={{textAlign: 'center'}}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            m: 2,
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Наши работы
                    </Typography>
                </Grid>
                <Grid item sx={{display: {md: 'none', xs: 'flex'}, justifyContent: 'center', width: '100%', mb: 2}}>
                    <FormControl>
                        <Select
                        id='category'
                        value={select}
                        onChange={selectCategorySelect}
                        >
                        <MenuItem value={0}>Все категории</MenuItem>
                            {category?.map((cat) => (
                                <MenuItem value={cat.id}>{cat.category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={{display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around', width: '100%', mb: 2}}>
                    <Button className='header__button'
                            variant={select === 0 ? 'contained' : 'outlined'}
                            sx={{ display: 'block' }}
                            onClick={allCategory}
                    >
                        Все категории
                    </Button>
                    {category?.map((cat) => (
                            <Button key={cat.id} className='header__button'
                                    variant={cat.id === select ? 'contained' : 'outlined'}
                                    sx={{ display: 'block' }}
                                    onClick={() => selectCategory(cat.id)}
                            >
                                {cat.category}
                            </Button>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default PortfolioHeader;