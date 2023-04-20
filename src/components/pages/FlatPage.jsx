import { Grid, Box, Card, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadcrumbsComponent from '../BreadcrumbsComponent';
import { RotatingLines } from "react-loader-spinner";
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import { API_URL } from '../../api/config';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function FlatPage() {
  const [page, setPage] = useState([]);
  const params = useParams()

  let breadcrumbs = [
    { name: page.name, link: `/${page.slug}/` },
  ]

  const getPage = async () => {
    const response = await axios.get(`${API_URL}api/main/${params.slug}`)
    setPage(response.data)
  }

  useEffect(() => {
    getPage()
  }, [])

  if (!page) {
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
    <>
      <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }} component='div'>
        <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      </Box>
      <Fade>
        <Grid container spacing={2} className='flatpage'>
          <Grid item sm={6} >
            <Card className='flatpage__image-card'>
              <CardMedia
                component="img"
                className='flatpage__image'
                image={page.image}
                title={page.title}
              />
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Typography className='flatpage__title' variant='h4'>{page.name}</Typography>
            <Typography variant='body1'>{page.description}</Typography>
          </Grid>
        </Grid>
      </Fade>
    </>
  )
}

export default FlatPage