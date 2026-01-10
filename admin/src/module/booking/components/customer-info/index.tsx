import React from 'react'
import { BookingType } from '@module/booking/api/types';
import { getBookingStatusStyles } from '@module/booking/utils/getStatusStyle';
import { cn } from '@/lib/utils';

import { InfoRow } from '../common'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator';
import { Card, CardContent, CardHeader } from '@ui/card'

const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
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
    booking: BookingType;
}
    

const BookingCustomerInfo: React.FC<BookingCustomerInfoProps> = ({ booking }) => {
    const expired = isExpired(booking.expiresAt);

    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex items-center justify-between w-full'>
                    <Typography variant="lead">Booking Information</Typography>
                    <span className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium',
                        getBookingStatusStyles(booking.bookingStatus)
                    )}>
                        {booking.bookingStatus.replace(/_/g, ' ')}
                    </span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <InfoRow label="Booking ID" value={booking._id} />
                    <InfoRow label="Tour ID" value={booking.tourId} />
                    <InfoRow label="Package ID" value={booking.packageId} />
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Expired
                        </Typography>
                        <span className={cn(
                            'w-fit px-2.5 py-1 rounded-full text-xs font-medium',
                            expired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        )}>
                            {expired ? 'Yes' : 'No'}
                        </span>
                    </div>
                </div>
                
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <InfoRow label="Expires At" value={formatDate(booking.expiresAt)} />
                    <InfoRow label="Created At" value={formatDate(booking.createdAt)} />
                    <InfoRow label="Updated At" value={formatDate(booking.updatedAt)} />
                </div>

                <Separator />

                <Typography variant="large">Customer Details</Typography>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
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
                        <Typography variant="p" className='font-medium text-muted-foreground'>
                            Travel Members ({booking.customerDetails.members.length})
                        </Typography>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {booking.customerDetails.members.map((member, index) => (
                                <div key={index} className='flex items-center gap-3 p-3 bg-muted rounded-lg'>
                                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                                        <Typography variant="small" className='text-primary font-medium'>
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
