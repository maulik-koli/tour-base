import React from 'react'
import { GetBookingDetailsResponse } from '@module/booking/api/types';
import { getBookingStatusStyles } from '@module/booking/utils/getStatusStyle';
import { cn, formatDate } from '@/lib/utils';

import { InfoRow } from '../common'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator';
import { Card, CardContent, CardHeader } from '@ui/card'

const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
}

const formatDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

interface BookingCustomerInfoProps {
    booking: GetBookingDetailsResponse;
}
    

const BookingCustomerInfo: React.FC<BookingCustomerInfoProps> = ({ booking }) => {
    const expired = isExpired(booking.expiresAt);

    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full'>
                    <Typography variant="lead" className='text-base md:text-lg'>Booking Information</Typography>
                    <span className={cn(
                        'px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium w-fit',
                        getBookingStatusStyles(booking.bookingStatus)
                    )}>
                        {booking.bookingStatus.replace(/_/g, ' ')}
                    </span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 md:gap-5 lg:gap-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
                    <InfoRow label="Booking ID" value={booking._id} />
                    <InfoRow label="Tour ID" value={booking.tourId} />
                    <InfoRow label="Package ID" value={booking.packageId} />
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Expired
                        </Typography>
                        <span className={cn(
                            'w-fit px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-medium',
                            expired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        )}>
                            {expired ? 'Yes' : 'No'}
                        </span>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
                    <InfoRow label="Expires At" value={formatDate(booking.expiresAt, true)} />
                    <InfoRow label="Created At" value={formatDate(booking.createdAt)} />
                    <InfoRow label="Updated At" value={formatDate(booking.updatedAt)} />
                </div>

                <Separator />

                <Typography variant="large" className='text-base md:text-lg'>Customer Details</Typography>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
                    <InfoRow 
                        label="Full Name" 
                        value={booking.customerDetails?.fullName} 
                    />
                    <InfoRow 
                        label="Primary Phone" 
                        value={booking.customerDetails?.phone1} 
                    />
                    <InfoRow 
                        label="Secondary Phone" 
                        value={booking.customerDetails?.phone2} 
                    />
                    <InfoRow 
                        label="Date of Travel" 
                        value={booking.customerDetails?.dateOfTravel ? formatDateOnly(booking.customerDetails.dateOfTravel) : undefined} 
                    />
                </div>

                {booking.customerDetails?.members && booking.customerDetails.members.length > 0 && (
                    <>
                        <Typography variant="p" className='font-medium text-muted-foreground text-sm md:text-base'>
                            Travel Members ({booking.customerDetails.members.length})
                        </Typography>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
                            {booking.customerDetails.members.map((member, index) => (
                                <div key={index} className='flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-muted rounded-lg'>
                                    <div className='w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                                        <Typography variant="small" className='text-primary font-medium text-xs md:text-sm'>
                                            {member.gender}
                                        </Typography>
                                    </div>
                                    <div className='flex flex-col'>
                                        <Typography variant="small" className='font-medium'>
                                            {member.fullName}
                                        </Typography>
                                        <Typography variant="muted">
                                            Age: {member.age}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default BookingCustomerInfo
