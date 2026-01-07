"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'


const AboutSection: React.FC = () => {
    const router = useRouter();

    return (
        <div className='p-20 flex flex-col gap-8 bg-card'>
            <div className='grid grid-cols-2 gap-16'>
                <div className='flex flex-col gap-6'>
                    <Typography variant="h2" className='text-start max-w-md'>
                        Your Trusted Travel Partner Since 2010
                    </Typography>

                    <Typography>
                        Eklavya Tourism is a customer-focused travel agency dedicated to creating comfortable and well-organized trips across India and international destinations. We specialize in planning journeys for families, couples, students, and corporate groups, ensuring every trip is safe, enjoyable, and affordable. Our team believes that travel should be a smooth and enriching experience, so we handle all the small details and logistics to make your journey completely stress-free.
                    </Typography>
                    <Typography>
                        We take pride in offering personalized itineraries, transparent pricing, and reliable support throughout your trip. Whether you are looking for a spiritual journey, a romantic honeymoon, or a corporate group tour, we provide trusted accommodations and smooth transportation for every traveler. At Eklavya Tourism, our goal is to turn every trip into a meaningful experience and ensure you return home with wonderful stories to share.
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

                    <Button 
                        variant="default"
                        size="lg"
                        type='button'
                        onClick={() => router.replace('/tours')}
                        className='max-w-min mt-2'
                    >
                        Explore All Tours
                        <Icon name='ArrowRight' width={16} height={16} />
                    </Button>
                </div>
                <div className="w-full relative h-full">
                    <FallbackImage
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
