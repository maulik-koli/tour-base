import React from 'react'
import { GetBookingDataResponse } from '@modules/booking/api/types';

import FallbackImage from '@/components/fallback-image';
import Icon from '@/components/icons';
import { Typography } from '@ui/typography';

interface BookingSummeryProps {
    tour: GetBookingDataResponse["tour"]
    packageData: GetBookingDataResponse["package"]
}


const BookingSummery: React.FC<BookingSummeryProps> = ({ tour, packageData }) => {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            <div className='w-full h-fit bg-card rounded-md border border-border flex flex-col'>
                <div className='relative w-full aspect-7/3 rounded-t-md'>
                    <FallbackImage
                        src={tour.thumbnailImage}
                        alt={`${tour.tourName} Thumbnail Image`}
                        crop="fill"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className='object-cover rounded-t-md'
                    />

                    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />

                    <div className='absolute bottom-4 left-4'>
                        <Typography variant="h3" className='text-primary-foreground'>
                            {tour.tourName}    
                        </Typography>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-3 md:gap-4 p-3 md:p-4'>
                    <div className='w-full flex items-center gap-2'>
                        <Icon name='MapPinned' className='w-5 h-5 md:w-6 md:h-6 text-secondary-foreground'/>
                        <Typography variant="h4" className='font-medium'>Package Deatails</Typography>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Price per person</Typography>
                            <Typography variant="h4" className='font-semibold text-primary'>
                                ₹ {packageData.pricePerPerson}
                            </Typography>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Price for 6-11 years old</Typography>
                            <Typography variant="h4" className='font-semibold text-primary'>
                                ₹ {packageData.childrenPrice}
                            </Typography>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Duration</Typography>
                            <Typography variant="p" className='font-semibold'>
                                {packageData.days} Days / {packageData.nights} Nights
                            </Typography>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Route</Typography>
                            <Typography variant="p" className='font-semibold'>
                                {packageData.startCity} - {packageData.endCity}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-fit p-3 md:p-4 bg-card rounded-md border border-border'>
                {tour.includes.length > 0 && tour.excludes.length > 0 && (
                    <div>
                        <Typography variant="h4" className='mb-4'>What's Included & Excluded</Typography>
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
        </div>
    )
}

export default BookingSummery
