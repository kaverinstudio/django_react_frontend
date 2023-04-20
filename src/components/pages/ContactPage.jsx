import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import Fade from 'react-reveal/Fade';
import { RotatingLines } from "react-loader-spinner";
import BreadcrumbsComponent from '../BreadcrumbsComponent'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { YMaps, Map, Placemark, FullscreenControl, ZoomControl } from '@pbe/react-yandex-maps';
import { API_URL } from '../../api/config';

function ContactPage() {
  const [page, setPage] = useState([]);

  const defaultState = {
    center: [50.083313, 45.407908],
    zoom: 17,
    controls: [],
  };

  let breadcrumbs = [
    { name: page.name, link: `/${page.slug}/` },
  ]

  const getPage = async () => {
    const response = await axios.get(`${API_URL}api/contact/`)
    setPage(response.data[0])
  }

  useEffect(() => {
    getPage()
  }, [])
  console.log(page)

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
          <Grid item sm={6} sx={{ width: '100%' }}>
            <Card className='flatpage__image-card'>
              <YMaps >
                <Map defaultState={defaultState} width={'100%'} height={'100%'}>
                  <Placemark geometry={[50.083313, 45.407908]} />
                  <FullscreenControl />
                  <ZoomControl options={{ float: "right" }} />
                </Map>
              </YMaps>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Typography className='flatpage__title' variant='h4'>{page.name}</Typography>
            <Box component='div'>
              <br /><br />
              <b>Наш адрес:</b> <br />
              <i class="fa fa-building-o"></i> {page.address}<br /><br />
              <br />
              <b>Телефоны: </b> <br />
              <i class="fa fa-phone-square"></i> {page.phone} <br />
              <b>График работы: </b> <br />
              <i class="fa fa-clock-o"></i> {page.work_time}<br />
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </>
  )
}

export default ContactPage