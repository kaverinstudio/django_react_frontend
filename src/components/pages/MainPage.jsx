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
  Container, Grid,
  Typography
} from "@mui/material";
import Fade from 'react-reveal/Fade';
import {RotatingLines} from "react-loader-spinner";
import {useDispatch, useSelector} from "react-redux";
import {showLoader} from "../../redux/slices/portfolioSlice";

const MainPage = () => {
  const [blocks, setBlock] = useState([])
  const loader = useSelector(state => state.portfolio.isVisible)
  const dispatch = useDispatch()

  useEffect(() => {
    getBlocks()
  }, [])

  const getBlocks = async () => {
    dispatch(showLoader(true))
    const response = await fetch('/api/main/')
    await response.json().then((data) => {
      setBlock(data)
      dispatch(showLoader(false))
    })
  }

  if (loader){
    return (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%'}}>
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
        <Box sx={{flexGrow: 1, marginTop: 2, marginBottom: 2}}>
        <Grid container spacing={2}>
        {blocks.map(block=>

              <Grid key={block.id} item sm={6} md={4} xs={12}>
                <Fade>
              <Card>
                <CardActionArea>
                  <CardMedia
                      component="img"
                      height="200"
                      image={block.image}
                      alt={block.name}
                  />
                  <CardContent sx={{minHeight: 113}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {block.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {block.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Подробнее
                  </Button>
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