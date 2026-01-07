"use client"
import React from 'react'
import SearchButtonBar from '@/modules/tours/components/search-button-bar'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@/components/ui/typography'


const HeroSection: React.FC = () => {
    return (
        <section className="bg-card relative w-full px-4 md:px-20 min-h-[calc(100svh-4rem)] h-[calc(100svh-4rem)]">
            <FallbackImage
                src="/hero-for-now.avif"
                alt="Eklavya Tourism Hero Image"
                fill
                className="object-cover"
            />

            {/* <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60" /> */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

            <div className="relative z-10 flex flex-col  items-center justify-center h-full text-center px-4">
                <div className='relative w-20 h-10 md:w-30 md:h-15 mb-2 rounded-sm'>
                    <FallbackImage
                        src="/logo-bg.avif"
                        alt="Eklavya Tourism Logo"
                        height={80}
                        fill
                        className="object-contain rounded-sm"
                    />
                </div>
                
                <div className="md:max-w-md mb-4 md:mb-6">
                    <Typography variant="h1" className="text-primary-foreground text-3xl md:text-6xl leading-tight">
                        Journeys Across Incredible <span className="text-primary">India</span>
                    </Typography>
                </div>

                <Typography variant='h4' className="max-w-lg text-primary-foreground/80 mb-6 md:mb-8 text-base md:text-2xl px-4 md:px-0">
                    Explore hand-crafted tours across India leisure, culture, and spiritual journeys made simple.
                </Typography>

                <SearchButtonBar />
            </div>
    </section>
    )
}

export default HeroSection
