import React from "react";
import { PackageBookingInfo, TourBookingInfo } from "@module/booking/api/types";
import { formatCurrency } from "@/lib/utils";

import { InfoRow } from "../common";
import { Typography } from "@ui/typography";
import { Card, CardContent, CardHeader } from "@ui/card";


export const BookingPackgeInfo: React.FC<{ packageDetails: PackageBookingInfo }> = ({ packageDetails }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <Typography variant="lead" className='text-base md:text-lg'>Package Details</Typography>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6'>
                    <div className='md:col-span-2'>
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
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-5 lg:mt-6'>
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
                        <Typography variant="p" className='font-medium text-primary text-sm md:text-base'>
                            {formatCurrency(packageDetails.pricePerPerson)}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Children Price
                        </Typography>
                        <Typography variant="p" className='font-medium text-primary text-sm md:text-base'>
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
                <Typography variant="lead" className='text-base md:text-lg'>Tour Details</Typography>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 md:gap-5 lg:gap-6'>
                <InfoRow 
                    label="Tour Name" 
                    value={tourDetails.tourName} 
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6'>
                    <div className='flex flex-col gap-2 md:gap-3'>
                        <Typography variant="large" className='text-green-700 text-base md:text-lg'>
                            Includes
                        </Typography>
                        {tourDetails.includes.length > 0 ? (
                            <ul className='list-disc ml-5 md:ml-6 space-y-1.5 md:space-y-2'>
                                {tourDetails.includes.map((item, index) => (
                                    <li key={index}>
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

                    <div className='flex flex-col gap-2 md:gap-3'>
                        <Typography variant="large" className='text-red-700 text-base md:text-lg'>
                            Excludes
                        </Typography>
                        {tourDetails.excludes.length > 0 ? (
                            <ul className='list-disc ml-5 md:ml-6 space-y-1.5 md:space-y-2'>
                                {tourDetails.excludes.map((item, index) => (
                                    <li key={index}>
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