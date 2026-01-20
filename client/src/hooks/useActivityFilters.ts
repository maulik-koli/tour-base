import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GetActivitiesParams } from "@modules/activities/api/types";


export const useActivityFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // url to filter object
    const filter = useMemo<GetActivitiesParams>(() => {
        return {
            search: searchParams.get('search') || undefined,
            page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
            limit: 12,
        }
    }, [searchParams]);


    const [localFilter, setLocalFilter] = useState<GetActivitiesParams>(filter);

    useEffect(() => {
        const updatedFilter = {...filter};
        setLocalFilter((pre) => ({...pre, ...updatedFilter}));
    }, [filter]);

    const applyFilters = useCallback((newFilter: GetActivitiesParams, debounce = true) => {
        setLocalFilter(newFilter);

        if(debounce) {
            if(debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                updateUrl(newFilter);
            }, 400)
        }
        else {
            updateUrl(newFilter);
        }
    }, [])

    // value to url
    const updateUrl = (newFilter: GetActivitiesParams) => {
        const params = new URLSearchParams();

        if(newFilter.search) params.set('search', newFilter.search);
        if(newFilter.page && newFilter.page > 1) params.set('page', String(newFilter.page));

        router.push(`/activities?${params.toString()}`, {
            scroll: false
        });
    }

    
    const resetFilters = useCallback(() => {
        router.replace('/activities', { scroll: false });
    }, [router]);


    return {
        filter: localFilter,
        applyFilters,
        resetFilters
    }
};
