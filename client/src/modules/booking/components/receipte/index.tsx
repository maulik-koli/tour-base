import React from 'react'
import { GetBookingDataResponse, PaymentOption } from '@modules/booking/api/types'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'

interface ReceiptPaymentProps {
    data: GetBookingDataResponse;
    options: PaymentOption
}


const ReceiptPayment: React.FC<ReceiptPaymentProps> = ({ data, options }) => {
    const isFull = options === "FULL"

    return (
        <>
            <Typography variant="h3">
                Booking Receipt & Travel Members   
            </Typography>
            <div className='w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-dashed border-primary bg-primary/15'>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex flex-col gap-3 md:gap-4 items-center'>
                        <div className='relative w-24 h-12 md:w-32 md:h-16 rounded-md'>
                            <FallbackImage
                                src='/logo-bg.avif'
                                alt='Eklavya Tourism Logo'
                                fill
                                sizes="(max-width: 768px) 96px, 128px"
                                className='object-contain rounded-md'
                            />
                        </div>
                        <Typography variant="h4" className='text-center font-semibold'>
                            Eklavya Tourism
                        </Typography>
                        <div className='flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50'>
                            <Icon name='Calendar' className='w-4 h-4 text-primary' />
                            <Typography variant="p" className='font-medium'>
                                {new Date(data.createdAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </Typography>
                        </div>
                    </div>
                </div>

                <Separator className='bg-foreground/50' />

                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
                    <div className='w-full bg-card p-3 md:p-3 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='MapPinned' className='w-4 h-4 md:w-5 md:h-5 text-primary'/>
                            <Typography variant="large" className='font-medium'>Traveler Details</Typography>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Tour:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.tour.tourName}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Package Name:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.package.packageName}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Routes:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.package.startCity} {`→`} {data.package.endCity}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Date:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {new Date(data.customerBookingDetails?.dateOfTravel || '').toLocaleDateString()}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-card p-3 md:p-4 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='User' className='w-4 h-4 md:w-5 md:h-5 text-primary'/>
                            <Typography variant="large" className='font-medium'>Customer Details</Typography>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Name:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.customerBookingDetails?.fullName}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Phone 1:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.customerBookingDetails?.phone1}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Phone 2:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.customerBookingDetails?.phone2}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Total Person:</Typography>
                                <Typography variant="p" className='font-medium'>
                                    {data.customerBookingDetails?.members.length} person(s)
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-card p-3 md:p-4 rounded-md border border-border flex flex-col gap-3 md:gap-4'>
                    <div className='flex items-center gap-2'>
                        <Icon name='Calculator' className='w-4 h-4 md:w-5 md:h-5 text-primary'/>
                        <Typography variant="large" className='font-medium'>Price Breakdown</Typography>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {data.customerBookingDetails?.members.map((member, index) => (
                            <div 
                                key={`${index}-${member.age}`} 
                                className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-1'
                            >
                                <div className='flex items-center gap-3 md:gap-4'>
                                    <div className='h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary shrink-0'>
                                        <Icon name='User' className='w-3 h-3 md:w-4 md:h-4' />
                                    </div>
                                    <Typography variant="p">
                                        {member.fullName} <span className='ml-1 text-muted-foreground'>({member.age} years old)</span>
                                    </Typography>

                                </div>
                                <Typography variant="p" className='font-medium'>
                                    ₹ {getTravelMemberPrice(member.age, data.package.pricePerPerson, data.package.childrenPrice)}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div className='flex flex-col gap-2'>
                        <div className='w-full flex items-center justify-between p-1'>
                            <Typography variant="h4">Total Amount</Typography>
                            <Typography variant="h4" className='font-semibold'>₹ {data.totalAmount}</Typography>
                        </div>
                        <div className='w-full flex items-center justify-between p-1'>
                            <Typography variant="p" className='text-primary font-semibold'>
                                Payment amount ({isFull ? "100%" : "50%" })
                            </Typography>
                            <Typography variant="p" className='text-primary font-semibold'>
                                ₹ {data.totalAmount && (isFull ? data.totalAmount : data.totalAmount / 2)}
                            </Typography>
                        </div>
                        {!isFull && (
                            <div className='w-full flex items-center justify-between p-1'>
                                <Typography variant="p" className='text-accent font-semibold'>Due Amount (Remaining 50%)</Typography>
                                <Typography variant="p" className='text-accent font-semibold'>
                                    ₹ {data.totalAmount && data.totalAmount / 2}
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReceiptPayment



const getTravelMemberPrice = function(age: number, pricePerPerson: number, childrenPrice: number) {
    if (age < 12 && age >= 6) {
        return childrenPrice;
    }
    else if (age < 6) {
        return 0;
    }
    return pricePerPerson;
}