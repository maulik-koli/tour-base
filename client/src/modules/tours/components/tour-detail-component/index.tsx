'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'

import AccordionComponent from '@/components/ui/accordion-component'
import Icon from '@/components/icons'
import { Typography } from '@/components/ui/typography'


const DUMMU_DAYS = [
    {
        title: "Arrival in Kathmandu",
        subtitle: "Welcome to the something in the way",
        description: "Upon your arrival at Tribhuvan International Airport in Kathmandu, you will be warmly welcomed by our representative who will assist you with your transfer to the hotel. After check-in, take some time to relax and acclimate to the new environment. In the evening, we will host a welcome dinner where you can meet your fellow travelers and get an overview of the exciting journey ahead."
    },
    {
        title: "Something else",
        subtitle: "Welcome to the something in the way",
        description: "Upon your arrival at Tribhuvan International Airport in Kathmandu, you will be warmly welcomed by our representative who will assist you with your transfer to the hotel. After check-in, take some time to relax and acclimate to the new environment. In the evening, we will host a welcome dinner where you can meet your fellow travelers and get an overview of the exciting journey ahead."
    },
]

const INCLUDES = [
    "Accommodation in comfortable hotels and lodges throughout the trek.",
    "All meals during the trek (breakfast, lunch, and dinner).",
    "Experienced English-speaking guide and porters.",
    "All necessary permits and entrance fees for trekking areas.",
    "Transportation from Kathmandu to the starting point of the trek and back.",
]

const EXCLUDES = [
    "Accommodation in comfortable hotels and lodges throughout the trek.",
    "All meals during the trek (breakfast, lunch, and dinner).",
    "Experienced English-speaking guide and porters.",
    "All necessary permits and entrance fees for trekking areas.",
    "Transportation from Kathmandu to the starting point of the trek and back.",
]


const TourDetailComponent: React.FC = () => {
    return (
        <div className='flex flex-col space-y-12'>
            <div>
                <Typography variant="h2" className='mb-4'>Overview</Typography>
                <Typography variant="lead" className='text-muted-foreground'>
                    Embark on a breathtaking journey through the heart of the Himalayas with our Majestic Himalayan Adventure tour. This unforgettable experience takes you through some of the most stunning landscapes on Earth, from towering snow-capped peaks to lush green valleys and serene alpine meadows. Along the way, you'll have the opportunity to immerse yourself in the rich culture and traditions of the local communities, visit ancient monasteries, and witness the vibrant festivals that celebrate the spirit of the Himalayas.
                </Typography>
            </div>

            <div>
                <Typography variant="h2" className='mb-4'>Galary</Typography>
                <div className='grid grid-cols-3 gap-9'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='relative w-full  aspect-square rounded-xl'>
                            <CldImage
                                src="https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
                                crop="fill"
                                alt="tour tile"
                                fill
                                sizes="100vw 100vh"
                                className='object-cover rounded-2xl'
                            />
                        </div>
                    ))}    
                </div>
            </div>

            <div>
                <Typography variant="h2" className='mb-4'>Video</Typography>
                <div className='w-full rounded-xl'>
                    <iframe
                        className='w-full aspect-9/4 rounded-xl'
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div>
                <Typography variant="h2" className='mb-4'>Days-wise Details</Typography>
                <AccordionComponent
                    items={
                        DUMMU_DAYS.map((day, index) => ({
                            label: (
                                    <div className='w-full flex items-center gap-3'>
                                        <div className='w-9 h-9 min-h-9 min-w-9 rounded-full flex items-center justify-center bg-primary text-lg font-semibold text-primary-foreground'>
                                            {index + 1}
                                        </div>
                                        <div className='space-y-1 w-full'>
                                            <Typography variant="p" className='truncate'>
                                                {day.title}
                                            </Typography>
                                            <Typography variant="small" className='truncate'>
                                                {day.subtitle}
                                            </Typography>
                                        </div>
                                </div>
                            ),
                            value: `day-${index + 1}`,
                            content: (
                                <div>
                                    <Typography variant="p">
                                        {day.description}
                                    </Typography>
                                </div>  
                            )
                        }))
                    }
                />
            </div>

            <div>
                <Typography variant="h2" className='mb-4'>What's Included & Excluded</Typography>
                <div className='space-y-6'>
                    <div className='space-y-3'>
                        <Typography variant="h4" className='text-green-500 underline'>Inclusions</Typography>
                        <div className='space-y-2'>
                            {INCLUDES.map((include, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <Icon name='CircleCheck' width={20} height={20} className='text-green-500 shrink-0' />
                                    <Typography variant="p" className='text-muted-foreground'>
                                        {include}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <Typography variant="h4" className='text-red-500 underline'>Exclusions</Typography>
                        <div className='space-y-2'>
                            {EXCLUDES.map((exclude, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <Icon name='CircleX' width={20} height={20} className='text-red-500 shrink-0' />
                                    <Typography variant="p" className='text-muted-foreground'>
                                        {exclude}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetailComponent
