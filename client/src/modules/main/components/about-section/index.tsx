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
        <div className='p-4 md:p-12 lg:p-20 flex flex-col gap-8 bg-card'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
                <div className="w-full relative h-64 md:h-96 lg:h-full lg:order-2">
                    <FallbackImage
                        src="/about-image.jpg"
                        crop="fill"
                        alt="Eklavya Tourism About Us"
                        fill
                        sizes="100vw 100vh"
                        loading='eager'
                        className='rounded-xl'
                    />
                </div>

                {/* Text content - Shows second on mobile */}
                <div className='flex flex-col gap-4 md:gap-6 lg:order-1'>
                    <Typography variant="h2" className='text-start text-2xl md:text-3xl lg:text-4xl'>
                        Your Trusted Travel Partner Since 2010
                    </Typography>

                    <Typography className='text-sm md:text-base'>
                        Eklavya Tourism is a customer-focused travel agency dedicated to creating comfortable and well-organized trips across India and international destinations. We specialize in planning journeys for families, couples, students, and corporate groups, ensuring every trip is safe, enjoyable, and affordable. Our team believes that travel should be a smooth and enriching experience, so we handle all the small details and logistics to make your journey completely stress-free.
                    </Typography>
                    <Typography className='text-sm md:text-base'>
                        We take pride in offering personalized itineraries, transparent pricing, and reliable support throughout your trip. Whether you are looking for a spiritual journey, a romantic honeymoon, or a corporate group tour, we provide trusted accommodations and smooth transportation for every traveler. At Eklavya Tourism, our goal is to turn every trip into a meaningful experience and ensure you return home with wonderful stories to share.
                    </Typography>

                    <div className='grid grid-cols-3 gap-2 md:gap-4 my-2 md:my-4'>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold text-2xl md:text-3xl' >1500+</Typography>
                            <Typography variant='small' className='text-xs md:text-sm text-center'>Happy Travelers</Typography>
                        </div>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold text-2xl md:text-3xl' >50+</Typography>
                            <Typography variant='small' className='text-xs md:text-sm text-center'>Destinations</Typography>
                        </div>
                        <div className='flex flex-col gap-0.5 items-center'>
                            <Typography variant='h3' className='text-primary font-bold text-2xl md:text-3xl' >14+</Typography>
                            <Typography variant='small' className='text-xs md:text-sm text-center'>Years Experience</Typography>
                        </div>
                    </div>

                    <Button 
                        variant="default"
                        size="lg"
                        type='button'
                        onClick={() => router.replace('/tours')}
                        className='w-full md:max-w-min mt-2'
                    >
                        Explore All Tours
                        <Icon name='ArrowRight' width={16} height={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AboutSection
