import React from 'react'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TourPackage } from '@modules/tours/api/types'

export const DUMMY_PACKAGE = [
    {
        name: 'Standard Package',
        pricePerPerson: 12000,
        days: 5,
        nights: 4,
        start : 'Kathmandu',
        endCity: 'Kathmandu'
    },
    {
        name: 'Premium Package',
        pricePerPerson: 15000,
        days: 7,
        nights: 6,
        start : 'Kathmandu',
        endCity: 'Kathmandu'
    },
    {
        name: 'Luxery Package',
        pricePerPerson: 18000,
        days: 7,
        nights: 6,
        start : 'Kathmandu',
        endCity: 'Kathmandu'
    },
]

interface TourPackageSideProps {
    packages: TourPackage[];
    selectedPackageId: string | null;
    handleSelectPackage: (id: string) => void;
}
    

const TourPackageSide: React.FC<TourPackageSideProps> = ({ handleSelectPackage, packages, selectedPackageId }) => {
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
                        <Typography variant="h4" className='mb-2'>{pkg.name}</Typography>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Price per person</Typography>
                                <Typography variant="h4" className='font-semibold text-primary'>
                                    ₹{pkg.pricePerPerson}
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
                <div className='space-y-2.5'>
                    <Button size="lg" className='w-full h-12 text-lg'>Book Now</Button>
                    <Button variant="secondary" size="lg" className='w-full h-12 text-lg'>Contant Us</Button>
                </div>
            </div>
        </div>
    )
}

export default TourPackageSide
