import React from 'react'
import { TourPackage } from '@modules/tours/api/types'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import TourPriceSlot from '@/modules/tours/components/tour-price-slote'

interface TourPackageTabsProps {
    packages: TourPackage[];
    selectedPackageId: string | null;
    handleSelectPackage: (id: string) => void;
    bookButtons: React.ReactNode
}


const TourPackageTabs: React.FC<TourPackageTabsProps> = ({ packages, handleSelectPackage, selectedPackageId, bookButtons }) => {
    const selectedPackage = packages.find(pkg => pkg._id === selectedPackageId);

    return (
        <div>
            <Typography variant="h2" className='mb-4'>Packages</Typography>
            <div className='bg-card flex flex-col gap-4 md:gap-6 rounded-xl p-4 md:p-6 border border-border'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
                    {packages.map((pkg, index) => (
                        <div 
                            key={`package-${index}`} 
                            className={cn(
                                'w-full p-3 md:p-4 rounded-md border-2 flex flex-col gap-2 md:gap-3 cursor-pointer hover:shadow transition-shadow',
                                pkg._id === selectedPackageId ? 'border-primary bg-primary/20' : 'border-border bg-card'
                            )}
                            onClick={() => handleSelectPackage(pkg._id)}
                        >
                            <div className='flex items-start justify-between gap-2'>
                                <Typography variant="lead" className='font-semibold text-foreground'>{pkg.name}</Typography>
                                {pkg.priceSlots && pkg.priceSlots.length > 0 && (
                                    <span className='px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full whitespace-nowrap'>
                                        Group Discount
                                    </span>
                                )}
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <Typography variant="p" className='text-sm md:text-base'>
                                    {pkg.priceSlots && pkg.priceSlots.length > 0 ? 'Starting from' : 'Price per person'}
                                </Typography>
                                <Typography variant="large" className='font-semibold text-primary'>
                                    ₹{pkg.priceSlots && pkg.priceSlots.length > 0 
                                        ? Math.min(...pkg.priceSlots.map((s: any) => s.price || 0)).toLocaleString('en-IN')
                                        : pkg.pricePerPerson.toLocaleString('en-IN')
                                    }
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <Typography variant="p" className='text-sm md:text-base'>Duration</Typography>
                                <Typography variant="p" className='font-semibold'>
                                    {pkg.days} days / {pkg.nights} nights
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPackage && (
                    <>
                        <Separator />
                        <div className='bg-card p-3 md:p-4 rounded-md border border-border space-y-3 md:space-y-4'>
                            <Typography variant="h4" className='mb-2'>{selectedPackage.name}</Typography>
                            
                            <div className='space-y-4'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <Icon name="Users" width={18} height={18} className='text-primary' />
                                        <Typography variant="lead" className='font-medium text-foreground'>
                                            Adult Pricing (12+ years)
                                        </Typography>
                                    </div>
                                    
                                    <TourPriceSlot 
                                        priceSlots={selectedPackage.priceSlots}
                                        basePrice={selectedPackage.pricePerPerson}
                                    />
                                </div>

                                <Separator />

                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <Icon name="User" width={18} height={18} className='text-primary' />
                                        <Typography variant="lead" className='font-medium text-foreground'>
                                            Children Pricing
                                        </Typography>
                                    </div>
                                    
                                    <div className='space-y-1.5 pl-6'>
                                        <div className='flex items-center justify-between py-2 border-b border-border'>
                                            <div className='flex items-center gap-2'>
                                                <Typography variant="p" className='text-muted-foreground'>Under 6 years</Typography>
                                                <span className='px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium'>FREE</span>
                                            </div>
                                            <Typography variant="p" className='font-semibold text-green-600 dark:text-green-400'>
                                                ₹0
                                            </Typography>
                                        </div>
                                        
                                        <div className='flex items-center justify-between py-2'>
                                            <Typography variant="p" className='text-muted-foreground'>6-11 years</Typography>
                                            <Typography variant="p" className='font-semibold text-primary'>
                                                ₹{(selectedPackage.childrenPrice || selectedPackage.pricePerPerson).toLocaleString('en-IN')}
                                                <span className='text-xs text-muted-foreground font-normal'>/child</span>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className='space-y-2'>
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

                            <Separator />

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
                                                {hotel.hotelName}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {selectedPackage && bookButtons}
            </div>
        </div>
    )
}

export default TourPackageTabs
