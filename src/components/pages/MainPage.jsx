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

const MainPage = () => {
  const [blocks, setBlock] = useState([])

  console.log(blocks)

  useEffect(() => {
    getBlocks()
  }, [])

  const getBlocks = async () => {
    const response = await fetch('/api/main/')
    const data = await response.json()
    setBlock(data)
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