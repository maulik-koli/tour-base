import React from 'react'
import { GetBookingDataResponse, PaymentOption } from '@modules/booking/api/types'

import Icon from '@/components/icons'
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
            <div className='w-full px-12 py-8 flex flex-col gap-8 rounded-lg border border-dashed border-primary bg-primary/15'>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center'>
                            <Icon name='TicketCheck' width={50} height={50}  />
                        </div>
                        <Typography variant="h4" className='text-center'>
                            Eklavya Tourism
                        </Typography>
                        <div className='flex items-center gap-4'>
                            <Typography variant="p">
                                Date: {new Date(data.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="small" className='bg-accent/20 text-accent-foreground py-1 px-2 rounded-lg font-semibold'>
                                Confirm
                            </Typography>
                        </div>
                    </div>
                </div>

                <Separator className='bg-foreground/50' />

                <div className='w-full grid grid-cols-2 gap-12'>
                    <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='MapPinned' width={18} height={18} className='text-primary'/>
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
                    <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='User' width={18} height={18} className='text-primary'/>
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

                <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <Icon name='Calculator' width={18} height={18} className='text-primary'/>
                        <Typography variant="large" className='font-medium'>Price Breakdown</Typography>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {data.customerBookingDetails?.members.map((member, index) => (
                            <div 
                                key={`${index}-${member.age}`} 
                                className='flex items-center justify-between p-1'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary'>
                                        <Icon name='User' width={14} height={14} />
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