import React from 'react'
import { Typography } from '@/components/ui/typography'
import { DUMMY_PACKAGE } from '../tour-package-side'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/icons'

const HOTEL_DATA = [
    {
        nights: 1,
        city: "Haridwar",
        hotels: ["Hotel The Latitude", "Similar"]
    },
    {
        nights: 2,
        city: "Barkot",
        hotels: ["Rigveda Resort", "Nirvana Camp"]
    },
    {
        nights: 2,
        city: "Uttarkashi",
        hotels: ["Raja ji", "Great Ganga"]
    },
    {
        nights: 2,
        city: "Phata",
        hotels: ["Hotel White Heaven", "Hotel Anandam"]
    },
    {
        nights: 1,
        city: "Kedarnath Temple",
        hotels: ["Triple S Residency Quad Sharing"]
    },
    {
        nights: 1,
        city: "Badrinath",
        hotels: ["Hotel Ganesha", "Similar"]
    },
    {
        nights: 1,
        city: "Rudraprayag",
        hotels: ["Tulip Resort", "Similar"]
    }
];

const TourPackageTabs: React.FC = () => {
    return (
        <div>
            <Typography variant="h2" className='mb-4'>Packages</Typography>
            <div className='bg-card flex flex-col gap-6 rounded-xl p-6 border border-border'>
                <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4'>
                    {DUMMY_PACKAGE.map((pkg, index) => (
                        <div 
                            key={`package-${index}`} 
                            className={cn(
                                'w-full p-3 rounded-md border-2 flex flex-col gap-3 cursor-pointer hover:shadow',
                                pkg.name === "Premium Package" ? 'border-primary bg-primary/20' : 'border-border bg-card'
                            )}
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

                <Separator />

                <div className='bg-card p-4 rounded-md border border-border space-y-4'>
                    <Typography variant="h4" className='mb-2'>Standard Package</Typography>
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Price per person</Typography>
                            <Typography variant="h4" className='font-semibold text-primary'>
                                ₹ 12000
                            </Typography>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Duration</Typography>
                            <Typography variant="p" className='font-semibold'>5 Days / 4 Nights</Typography>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Typography variant="p">Route</Typography>
                            <Typography variant="p" className='font-semibold'>Start City - End City</Typography>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name="Hotel" width={20} height={20} className='text-primary' />
                            <Typography variant="lead" className='font-medium text-foreground'>Hotels</Typography>
                        </div>
                        <div className='space-y-2'>
                            {HOTEL_DATA.map((hotel, index) => (
                                <div 
                                    key={`hotel-${index}`}
                                    className='p-2 border border-border rounded-md flex flex-col gap-1.5'
                                >
                                    <Typography variant="p">
                                        {hotel.nights} Night{hotel.nights > 1 ? 's' : ''} in {hotel.city}
                                    </Typography>
                                    <Typography variant="p" className='text-muted-foreground'>
                                        {hotel.hotels.join(', ')}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourPackageTabs
