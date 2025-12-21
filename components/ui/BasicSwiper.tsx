"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { ReactNode } from 'react';
import { Autoplay } from 'swiper/modules';
import React from 'react';
const BasicSwiper = ({children}:{children: ReactNode}) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{delay:2500, disableOnInteraction: true}}
      spaceBetween={5}
      slidesPerView={"auto"}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {React.Children.map(children, child => { 
        return <SwiperSlide className='max-w-100!'>{child}</SwiperSlide>
       })    }
      </Swiper>
  )
}

export default BasicSwiper