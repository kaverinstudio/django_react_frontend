import axios from 'axios';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { API_URL } from '../../api/config';
import { useEffect } from 'react';
import { Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';

function SwiperComponent() {
  const [slides, setSlides] = useState([])

  const getSlides = async () => {
    const response = await axios.get(`${API_URL}api/slider/`)
    setSlides(response.data)
  }

  useEffect(() => {
    getSlides()
  }, [])


  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      loop={true}
    >
      {slides && slides.map(slide =>
        <SwiperSlide key={slide.id}>
          <Card className='slide__box'>
            <Link to={slide.post_link}>
              <Button variant="contained" className='slide__button' >Печать фотографий online</Button>
            </Link>
            <img src={slide.image} alt={slide.title} />
          </Card>
        </SwiperSlide>
      )}
    </Swiper >
  )
}

export default SwiperComponent