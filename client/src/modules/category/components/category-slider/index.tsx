"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { cn } from '@/lib/utils';

import Image from 'next/image';
import SectionHeader from '@modules/main/components/section-header';
import { Typography } from '@/components/ui/typography';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export const TOUR_CATEGORIES = [
    {
        id: 1,
        value: "beach",
        label: "Beach Getaways",
        image: "/hero-for-now.avif",
        tagline: "Relax by the sea, sunsets & coastal vibes",
    },
    {
        id: 2,
        value: "hill-station",
        label: "Hill Escapes",
        image: "/hero-for-now.avif",
        tagline: "Cool weather, mountains & scenic views",
    },
    {
        id: 3,
        value: "spiritual",
        label: "Spiritual Journeys",
        image: "/hero-for-now.avif",
        tagline: "Sacred temples & peaceful retreats",
    },
    {
        id: 4,
        value: "nature",
        label: "Nature & Wildlife",
        image: "/hero-for-now.avif",
        tagline: "Forests, rivers & untouched beauty",
    },
    {
        id: 5,
        value: "heritage",
        label: "Heritage & Culture",
        image: "/hero-for-now.avif",
        tagline: "Forts, traditions & timeless stories",
    },
    {
        id: 6,
        value: "adventure",
        label: "Adventure Trips",
        image: "/hero-for-now.avif",
        tagline: "Trekking, rafting & thrill experiences",
    },
]


const CategorySlider: React.FC = () => {
    // will call api here
    return (
        <section className="w-full py-20 overflow-hidden bg-background">
            <SectionHeader
                title={<>
                    Find Your <span className="text-primary">Perfect</span> Travel Experience
                </>}
                subtitle="From peaceful spiritual journeys to relaxing beach escapes and thrilling adventures across India."
            />

            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                centeredSlides
                loop
                spaceBetween={40}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="overflow-visible!"
            >
                {TOUR_CATEGORIES.map((item) => (
                    <SwiperSlide key={item.id}>
                        {({ isActive }) => (
                            <div
                                className={cn(
                                    "relative h-100 rounded-3xl overflow-hidden transition-all duration-500",
                                    isActive ? "scale-105 shadow-2xl" : "scale-95 opacity-80"
                                )}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.label}
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <Typography variant="h4" className="text-primary-foreground font-semibold">{item.label}</Typography>
                                    <Typography variant="p" className=" text-primary-foreground/80">{item.tagline}</Typography>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default CategorySlider
