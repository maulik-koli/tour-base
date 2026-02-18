import React from 'react'
import { cn } from '@/lib/utils'
import { TourPackage } from '@modules/tours/api/types'
import { Typography } from '@/components/ui/typography'

interface TourPackageSideProps {
    packages: TourPackage[];
    selectedPackageId: string | null;
    handleSelectPackage: (id: string) => void;
    bookButtons: React.ReactNode;
}
    

const TourPackageSide: React.FC<TourPackageSideProps> = ({ handleSelectPackage, packages, selectedPackageId, bookButtons }) => {
    return (
         <div className='w-full p-5 border border-border rounded-lg bg-card'>
            <Typography variant="h3" className='mb-5'>Choose Your Package</Typography>
            <div className='space-y-4'>
                {packages.map((pkg, index) => (
                    <div 
                        key={`package-${index}`} 
                        className={cn(
                            'p-4 rounded-md border-2 cursor-pointer hover:shadow-md',
                            pkg._id === selectedPackageId ? 'border-primary bg-primary/20' : 'border-border bg-card'
                        )}
                        onClick={() => handleSelectPackage(pkg._id)}
                    >
                        <div className='flex items-start justify-between gap-2 mb-2'>
                            <Typography variant="h4">{pkg.name}</Typography>
                            {pkg.priceSlots && pkg.priceSlots.length > 0 && (
                                <span className='px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full whitespace-nowrap'>
                                    Group Discount
                                </span>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">
                                    {pkg.priceSlots && pkg.priceSlots.length > 0 ? 'Starting from' : 'Price per person'}
                                </Typography>
                                <Typography variant="h4" className='font-semibold text-primary'>
                                    ₹{pkg.priceSlots && pkg.priceSlots.length > 0 
                                        ? Math.min(...pkg.priceSlots.map((s: any) => s.price || 0)).toLocaleString('en-IN')
                                        : pkg.pricePerPerson.toLocaleString('en-IN')
                                    }
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Duration</Typography>
                                <Typography variant="p" className='font-semibold'>
                                    {pkg.days} Days / {pkg.nights} Nights
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Route</Typography>
                                <Typography variant="p" className='font-semibold'>
                                    {pkg.startCity} - {pkg.endCity}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
                {bookButtons}
            </div>
        </div>
    )
}

export default TourPackageSide
