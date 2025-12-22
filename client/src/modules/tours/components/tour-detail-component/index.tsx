import React from 'react'
import { Tour } from '@modules/tours/api/types'

import Icon from '@/components/icons'
import HtmlRichText from '../html-rich-text'
import AccordionComponent from '@ui/accordion-component'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'

interface TourDetailComponentProps {
    tour: Tour
}
// https://www.youtube.com/embed/dQw4w9WgXcQ


const TourDetailComponent: React.FC<TourDetailComponentProps> = ({ tour }) => {
    return (
        <div className='flex flex-col space-y-12'>
            <div>
                <Typography variant="h2" className='mb-4'>Overview</Typography>
                <Typography variant="lead" className='text-muted-foreground'>
                    {tour.description}
                </Typography>
            </div>

            <div>
                <Typography variant="h2" className='mb-4'>Galary</Typography>
                <div className='grid grid-cols-3 gap-9'>
                    {tour.images.map((image, index) => (
                        <div key={index} className='relative w-full  aspect-square rounded-xl'>
                            <FallbackImage
                                src={image}
                                alt={`${tour.name}-image-${index + 1}`}
                                crop="fill"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className='object-cover rounded-2xl'
                            />
                        </div>
                    ))}    
                </div>
            </div>

           {tour.youtubeVideoUrl && (
                <div>
                    <Typography variant="h2" className='mb-4'>Video</Typography>
                    <div className='w-full rounded-xl'>
                        <iframe
                            className='w-full aspect-9/4 rounded-xl'
                            src={tour.youtubeVideoUrl ?? "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            <div>
                <Typography variant="h2" className='mb-4'>Days-wise Details</Typography>
                <AccordionComponent
                    items={tour.dayPlans.map((day, index) => ({
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
                                <HtmlRichText html={day.description} />
                            </div>  
                        )
                    }))}
                />
            </div>

            {tour.includes.length > 0 && tour.excludes.length > 0 && (
                <div>
                    <Typography variant="h2" className='mb-4'>What's Included & Excluded</Typography>
                    <div className='space-y-6'>
                        {tour.includes.length > 0 && (
                            <div className='space-y-3'>
                                <Typography variant="h4" className='text-green-500 underline'>Inclusions</Typography>
                                <div className='space-y-2'>
                                    {tour.includes.map((include, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <Icon name='CircleCheck' width={20} height={20} className='text-green-500 shrink-0' />
                                            <Typography variant="p" className='text-muted-foreground'>
                                                {include}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {tour.excludes.length > 0 && (
                            <div className='space-y-3'>
                                <Typography variant="h4" className='text-red-500 underline'>Exclusions</Typography>
                                <div className='space-y-2'>
                                    {tour.excludes.map((exclude, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <Icon name='CircleX' width={20} height={20} className='text-red-500 shrink-0' />
                                            <Typography variant="p" className='text-muted-foreground'>
                                                {exclude}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TourDetailComponent
