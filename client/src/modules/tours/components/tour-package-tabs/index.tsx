import React from 'react'
import { TourPackage } from '@modules/tours/api/types'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'

interface TourPackageTabsProps {
    packages: TourPackage[];
    selectedPackageId: string | null;
    handleSelectPackage: (id: string) => void;
}


const TourPackageTabs: React.FC<TourPackageTabsProps> = ({ packages, handleSelectPackage, selectedPackageId }) => {
    const selectedPackage = packages.find(pkg => pkg._id === selectedPackageId);

    return (
        <div>
            <Typography variant="h2" className='mb-4'>Packages</Typography>
            <div className='bg-card flex flex-col gap-6 rounded-xl p-6 border border-border'>
                <div className='grid grid-cols-3 gap-4'>
                    {packages.map((pkg, index) => (
                        <div 
                            key={`package-${index}`} 
                            className={cn(
                                'w-full p-3 rounded-md border-2 flex flex-col gap-3 cursor-pointer hover:shadow',
                                pkg._id === selectedPackageId ? 'border-primary bg-primary/20' : 'border-border bg-card'
                            )}
                            onClick={() => handleSelectPackage(pkg._id)}
                        >
                            <Typography variant="lead" className='font-semibold text-foreground'>{pkg.name}</Typography>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Price per person</Typography>
                                <Typography variant="large" className='font-semibold text-primary'>
                                    ₹ {pkg.pricePerPerson}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Duration</Typography>
                                <Typography variant="p" className='font-semibold'>
                                    {pkg.days} days / {pkg.nights} nights
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPackage &&
                (
                    <>
                        <Separator />
                        <div className='bg-card p-4 rounded-md border border-border space-y-4'>
                            <Typography variant="h4" className='mb-2'>{selectedPackage.name}</Typography>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <Typography variant="p">Price per person</Typography>
                                    <Typography variant="h4" className='font-semibold text-primary'>
                                        ₹ {selectedPackage.pricePerPerson}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography variant="p">Price for 6-11 years old</Typography>
                                    <Typography variant="h4" className='font-semibold text-primary'>
                                        ₹ {selectedPackage.childrenPrice || selectedPackage.pricePerPerson}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography variant="p">Duration</Typography>
                                    <Typography variant="p" className='font-semibold'>
                                        {selectedPackage.days} Days / {selectedPackage.nights} Nights
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography variant="p">Route</Typography>
                                    <Typography variant="p" className='font-semibold'>
                                        {selectedPackage.startCity} - {selectedPackage.endCity}</Typography>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-2'>
                                    <Icon name="Hotel" width={20} height={20} className='text-primary' />
                                    <Typography variant="lead" className='font-medium text-foreground'>Hotels</Typography>
                                </div>
                                <div className='space-y-2'>
                                    {selectedPackage.hotels.map((hotel, index) => (
                                        <div 
                                            key={`hotel-${index}`}
                                            className='p-2 border border-border rounded-md flex flex-col gap-1.5'
                                        >
                                            <Typography variant="p">
                                                {hotel.nightNo} Night{hotel.nightNo > 1 ? 's' : ''} in {hotel.city}
                                            </Typography>
                                            <Typography variant="p" className='text-muted-foreground'>
                                                {hotel.hotelName} / similar
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TourPackageTabs
