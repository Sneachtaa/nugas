import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Swipers() {
  return (
    <>
      <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-72 border rounded-lg"
      >
        <SwiperSlide className='flex'>
          <div className="w-full bg-red-500 h-full">
            
          </div>
        </SwiperSlide>
        <SwiperSlide className='flex'>
          <div className="w-full bg-red-600 h-full">
            
          </div>
        </SwiperSlide>
        <SwiperSlide className='flex'>
          <div className="w-full bg-red-500 h-full">
            
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
