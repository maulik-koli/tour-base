"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetCategories } from '@modules/category/api/queries';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import ErrorBlock from '@/components/error-block';
import FallbackImage from '@/components/fallback-image';
import SectionHeader from '@modules/main/components/section-header';
import { Typography } from '@/components/ui/typography';
import { CustomSpinner } from '@ui/spinner';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


const CategorySlider: React.FC = () => {
    const router = useRouter();
    const { data, isLoading, error } = useGetCategories();

    const handleRedirectoin = (category: string) => {
        router.replace(`/tours?category=${category}`);
    }
    

    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner className='w-full min-h-80 flex items-center justify-center' />
        }

        if (error) {
            return <ErrorBlock
                type='error' 
                message={error?.message} 
                description='Please try again later.'
                className='min-h-80'
            />;
        }

        if(!data || !data.data || (data && data.data?.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No featured tours found.'
                description='You have not marked any tours as featured yet.'
                className='min-h-30'
            />
        }

        return (
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1.5}
                centeredSlides
                loop
                spaceBetween={16}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                className="overflow-visible!"
            >
                {data.data.map((item) => (
                    <SwiperSlide key={item._id}>
                        {({ isActive }) => (
                            <div 
                                onClick={() => handleRedirectoin(item.value)}
                                className={cn(
                                    "relative h-64 md:h-100 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-2xl",
                                    isActive ? "scale-105 shadow-2xl" : "scale-95 opacity-80"
                                )}
                            >
                                <FallbackImage
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    crop="fill"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 text-white">
                                    <Typography variant="h4" className="text-primary-foreground font-semibold text-lg md:text-2xl">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="p" className="text-primary-foreground/80 text-sm md:text-base">
                                        {item.subtitle}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }


    return (
        <section className="w-full py-20 overflow-hidden bg-background">
            <SectionHeader
                title={<>
                    Find Your <span className="text-primary">Perfect</span> Travel Experience
                </>}
                subtitle="From peaceful spiritual journeys to relaxing beach escapes and thrilling adventures across India."
            />

            {getContent()}
        </section>
    )
}

export default CategorySlider
