import React from 'react'
import TourCard from '../tour-card'
import TourFilter from '../tour-filter'
import { TOURS } from '../../utils/tempConst'


const TourGrid: React.FC = () => {
    // here we call the list api and all
    // pass the query params to the tour filter if there is any
    // have to wrapp the grid componetn with memo to avoid re rendering on filter change

    return (
        <>
            <TourFilter />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {TOURS.map((tour) => (
                    <TourCard tour={tour} key={tour.slug} />
                ))}
            </div>
        </>
    )
}

export default TourGrid
