import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import Fade from 'react-reveal/Fade';
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "../../redux/slices/portfolioSlice";
import { Link } from 'react-router-dom';
import SwiperComponent from '../swiper/SwiperComponent';
import { API_URL } from '../../api/config';

const MainPage = () => {
  const [blocks, setBlock] = useState([])
  const loader = useSelector(state => state.portfolio.isVisible)
  const dispatch = useDispatch()

  const getBlocks = async () => {
    dispatch(showLoader(true))
    const response = await fetch(`${API_URL}api/main/`)
    await response.json().then((data) => {
      console.log(data)
      setBlock(data)
      dispatch(showLoader(false))
    })
  }

  useEffect(() => {
    getBlocks()
  }, [])

  if (loader) {
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

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }} component='div'>
      <Box sx={{ mb: 2 }} component='div'>
        <SwiperComponent />
      </Box>
      <Grid container spacing={2}>
        {blocks.map(block =>
          <Grid key={block.id} item sm={6} md={4} xs={12}>
            <Fade>
              <Card>
                <Link to={block.slug}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={block.image}
                      alt={block.name}
                    />
                    <CardContent sx={{ minHeight: 135 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {block.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {block.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Link to={block.slug}>
                    <Button size="small" color="primary">
                      Подробнее
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Fade>
          </Grid>
        )
        }
      </Grid>
    </Box>

  )
}

export default MainPage