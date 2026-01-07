'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Scrollbar } from 'swiper/modules';
import { TourListType } from '@/modules/tours/api/types';

import "swiper/css";
// import "swiper/css/navigatio";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


interface CardSliderWrapperProps {
    tours: TourListType[];
    children: (tour: TourListType) => React.ReactNode;
}


const CardSliderWrapper: React.FC<CardSliderWrapperProps> = ({ tours, children }) => {
    return (
         <div className="w-full flex overflow-x-auto scrollbar-hidden scroll-smooth">
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                slidesPerGroup={1}
                freeMode={false}
                navigation
                grabCursor
                loop={tours.length > 1}
                breakpoints={{
                    640: {
                        slidesPerView: tours.length < 2 ? tours.length : 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: tours.length < 3 ? tours.length : 3,
                        spaceBetween: 70,
                    },
                }}
                modules={[Navigation,FreeMode, Scrollbar]}
            >
                {tours.map((tour) => (
                    <SwiperSlide key={tour._id}>
                        {children(tour)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CardSliderWrapper
