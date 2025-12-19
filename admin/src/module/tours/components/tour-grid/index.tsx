import React, { useEffect, useState } from 'react'
import TourCard from '../tour-card'
import TourFilter from '../tour-filter'
import { TOURS } from '../../utils/tempConst'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetTours } from '../../apis/queries'

export type FilterType = {
    search: string | undefined;
    sort: string | undefined;
}

export type FilterFields = keyof FilterType;


const TourGrid: React.FC = () => {
    const [filters, setFilters] = useState<FilterType>({
        search: undefined,
        sort: undefined,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const { data, error, isLoading, refetch } = useGetTours({
        search: debouncedSearch,
        sort: filters.sort,
    });
    // here we call the list api and all
    // pass the query params to the tour filter if there is any
    // have to wrapp the grid componetn with memo to avoid re rendering on filter change

    const handleFilterChange = (name: FilterFields, value: string | undefined) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        refetch();
    }, [debouncedSearch, filters.sort]);

    const getContent = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error loading tours.</div>;
        }

        if(!data || (data && data.data?.tours.length === 0)) {
            return <div>No tours found.</div>;
        }

        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {data.data?.tours.map((tour) => (
                    <TourCard tour={tour} key={tour.slug} />
                ))}
            </div>
        )
    }


    return (
        <>
            <TourFilter filter={filters} onChange={handleFilterChange} />
            {getContent()}
        </>
    )
}

export default TourGrid
