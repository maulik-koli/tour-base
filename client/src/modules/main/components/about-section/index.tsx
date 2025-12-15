"use client"
import React from 'react'
import { Typography } from '@/components/ui/typography'
import { CldImage } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import Icon from '@/components/icons'


const AboutSection: React.FC = () => {
    return (
        <div className='p-20 flex flex-col gap-8 bg-card'>
            <div className='grid grid-cols-2 gap-16'>
                <div className='flex flex-col gap-6'>
                    <Typography variant="h2" className='text-start max-w-sm'>
                        Your Trusted Travel Partner Since 2010
                    </Typography>

                    <Typography>
                        WanderLust Tours has been creating unforgettable travel experiences for over a decade. We specialize in authentic, immersive journeys that connect you with local cultures, stunning landscapes, and hidden gems across incredible destinations.
                    </Typography>
                    <Typography>
                        Our expert team of travel enthusiasts carefully curates each tour to ensure you experience the very best of every destination, from luxury accommodations to authentic local experiences.
                    </Typography>

                    <div className='grid grid-cols-3'>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold' >1500+</Typography>
                            <Typography variant='small'>Happy Travelers</Typography>
                        </div>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold' >50+</Typography>
                            <Typography variant='small'>Destinations</Typography>
                        </div>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold' >14+</Typography>
                            <Typography variant='small'>Years Experience</Typography>
                        </div>
                    </div>

                    <Button variant="default" size="lg" className='max-w-min mt-2'>
                        Explore All Tours
                        <Icon name='ArrowRight' width={16} height={16} />
                    </Button>
                </div>
                <div className="w-full relative h-full">
                    <CldImage
                        src="https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
                        crop="fill"
                        alt="about name"
                        fill
                        sizes="100vw 100vh"
                        className='rounded-xl'
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutSection
