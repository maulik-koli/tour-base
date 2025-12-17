'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type TourFiltersReturnType = {
    maxPrice: number | undefined;
    duration: string | undefined;
    sort: string | undefined;
    category: string | undefined;
    search: string | undefined;
}


export const useTourFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const debourceRef = useRef<NodeJS.Timeout | null>(null);

    // url to filter object
    const filter = useMemo<TourFiltersReturnType>(() => {
        return {
            maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
            duration: searchParams.get('duration') || undefined,
            sort: searchParams.get('sort') || undefined,
            category: searchParams.get('category') || undefined,
            search: searchParams.get('search') || undefined,
        }
    }, []);


    const [localFilter, setLocalFilter] =  useState<TourFiltersReturnType>(filter);

    useEffect(() => {
        const updatedFilter = {...filter};
        setLocalFilter((pre) => ({...pre, ...updatedFilter}));
    }, [filter]);

    const applyFilters = useCallback((newFilter: TourFiltersReturnType, debounce = true) => {
        setLocalFilter(newFilter);

        if(debounce) {
            if(debourceRef.current) {
                clearTimeout(debourceRef.current);
            }

            debourceRef.current = setTimeout(() => {
                updateUrl(newFilter);
            }, 400)
        }
        else {
            updateUrl(newFilter);
        }
    }, [])

    // value to url
    const updateUrl = (newFilter: TourFiltersReturnType) => {
        const params = new URLSearchParams();

        if(newFilter.maxPrice) params.set('maxPrice', String(newFilter.maxPrice));
        if(newFilter.duration) params.set('duration', newFilter.duration);
        if(newFilter.sort) params.set('sort', newFilter.sort);
        if(newFilter.category) params.set('category', newFilter.category);
        if(newFilter.search) params.set('search', newFilter.search);

        router.push(`/tours?${params.toString()}`, {
            scroll: false
        });
    }

    
    const resetFilters = useCallback(() => {
        router.replace('/tours', { scroll: false });
    }, []);


    return {
        filter: localFilter,
        applyFilters,
        resetFilters
    }
};