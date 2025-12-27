'use client'
import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { TourPackage } from '@modules/tours/api/types'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'

import "swiper/css";
import "swiper/css/effect-fade";

interface TourThumbnailProps {
    name: string;
    thumbnailImage: string;
    packages: TourPackage[];
    images: string[];
}


const TourThumbnail: React.FC<TourThumbnailProps> = ({ name, thumbnailImage, packages, images }) => {
    const { minDays, maxDays } = useMemo(() => {
        return {
            minDays: Math.min(...packages.map(p => p.days)),
            maxDays: Math.max(...packages.map(p => p.days))
        }
    }, [packages])

    const allImages = useMemo(() => {
        return [thumbnailImage, ...images];
    }, [thumbnailImage, images]);

    return (
        <div className='relative w-full h-96 min-h-96 overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    className="w-full h-full"
                    allowTouchMove={false}
                >
                    {allImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <FallbackImage
                                src={image}
                                alt={`${name} - Image ${index + 1}`}
                                crop="fill"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className='object-cover'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent' />

            <div className='absolute bottom-9 left-9 flex flex-col gap-4 text-primary-foreground'>
                <Typography variant="h1" className="font-bold text-primary-foreground">{name}</Typography>
                <div className="flex gap-2 items-center">
                    <Icon name='CalendarDays' width={20} height={20} />
                    <Typography variant="lead" className='text-primary-foreground'>
                        {minDays === maxDays ? `${minDays} Days` : `${minDays} Days to ${maxDays} Days`}
                    </Typography>
                </div>
                {/* 
                    <div className='flex items-center space-x-4'>
                        <Typography variant="small" className="bg-orange-500 px-3 py-1 rounded-full text-primary-foreground font-medium">Adventure</Typography>
                        <Typography variant="small" className="bg-blue-500 px-3 py-1 rounded-full text-primary-foreground font-medium">Relexing</Typography>
                    </div> 
                */}
                {/* 
                    <div className="flex items-center space-x-4 text-lg">
                        <div className="flex gap-2 items-center">
                            <Icon name='CalendarDays' width={20} height={20} />
                            <Typography variant="lead" className='text-primary-foreground'>5 Days to 7 Days</Typography>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Icon name='Ticket' width={20} height={20} />
                            <Typography variant="lead" className='text-primary-foreground'>3 Packages</Typography>
                        </div>
                    </div>
                */}
            </div>
        </div>
    )
}

export default TourThumbnail