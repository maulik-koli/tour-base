import React from "react";
import { PackageBookingInfo, TourBookingInfo } from "@module/booking/api/types";

import { InfoRow } from "../common";
import { Typography } from "@ui/typography";
import { Card, CardContent, CardHeader } from "@ui/card";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
}


export const BookingPackgeInfo: React.FC<{ packageDetails: PackageBookingInfo }> = ({ packageDetails }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <Typography variant="lead">Package Details</Typography>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='col-span-2'>
                        <InfoRow 
                            label="Package Name" 
                            value={packageDetails.packageName} 
                        />
                    </div>
                    <InfoRow 
                        label="Duration" 
                        value={`${packageDetails.days} Days / ${packageDetails.nights} Nights`} 
                    />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
                    <InfoRow 
                        label="Start City" 
                        value={packageDetails.startCity} 
                    />
                    <InfoRow 
                        label="End City" 
                        value={packageDetails.endCity} 
                    />
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Price Per Person
                        </Typography>
                        <Typography variant="p" className='font-medium text-primary'>
                            {formatCurrency(packageDetails.pricePerPerson)}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Children Price
                        </Typography>
                        <Typography variant="p" className='font-medium text-primary'>
                            {formatCurrency(packageDetails.childrenPrice)}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}



export const BookingTourInfo: React.FC<{  tourDetails: TourBookingInfo }> = ({ tourDetails }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <Typography variant="lead">Tour Details</Typography>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
                <InfoRow 
                    label="Tour Name" 
                    value={tourDetails.tourName} 
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-3'>
                        <Typography variant="large" className='text-green-700'>
                            Includes
                        </Typography>
                        {tourDetails.includes.length > 0 ? (
                            <ul className='flex flex-col gap-2 list-none'>
                                {tourDetails.includes.map((item, index) => (
                                    <li key={index} className='flex items-start gap-2'>
                                        <span className='text-green-600 mt-1'>•</span>
                                        <Typography variant="small" className='text-foreground'>
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="p">-</Typography>
                        )}
                    </div>

                    <div className='flex flex-col gap-3'>
                        <Typography variant="large" className='text-red-700'>
                            Excludes
                        </Typography>
                        {tourDetails.excludes.length > 0 ? (
                            <ul className='flex flex-col gap-2 list-none'>
                                {tourDetails.excludes.map((item, index) => (
                                    <li key={index} className='flex items-start gap-2'>
                                        <span className='text-red-600 mt-1'>•</span>
                                        <Typography variant="small" className='text-foreground'>
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="p">-</Typography>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}