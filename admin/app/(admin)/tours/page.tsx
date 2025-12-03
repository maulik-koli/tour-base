import React from 'react'
import SearchBar from '@/module/tours/components/search-bar'
import TourCard from '@/module/tours/components/tour-card'
import { Typography } from '@/components/ui/typography'
import { TOURS } from '@/module/tours/utils/tempConst'


const TourPage: React.FC = () => {
    return (
        <div className='py-3 px-8'>
            <div className='flex flex-col gap-4'>
                <Typography variant="h1">Tours</Typography>

                <SearchBar />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-2'>
                    {TOURS.map((tour) => (
                        <TourCard key={tour.slug} tour={tour} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TourPage
