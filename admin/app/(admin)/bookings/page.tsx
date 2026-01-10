"use client"
import React, { useState, useMemo } from 'react'
import { Typography } from '@ui/typography'
import BookingsTable from '@module/booking/components/booking-table'
import BookingFilter from '@module/booking/components/booking-filter'
import { useDebounce } from '@/hooks/useDebounce'

// this will shift to the api typs
export type BookingList = {
    id: string;
    bookingId: string;
    bookingStatus: string;
    customerName: string;
    customerNumber: string;
    tourName: string;
    paymentStatus: string;
    createdAt: string;
}

const mockBookings: BookingList[] = [
    {
        id: "BK001",
        bookingId: "TOUR-2026-001",
        bookingStatus: "confirmed",
        customerName: "John Doe",
        customerNumber: "+91 98765 43210",
        tourName: "Golden Triangle Tour",
        paymentStatus: "paid",
        createdAt: "2026-01-08T10:30:00Z",
    },
    {
        id: "BK002",
        bookingId: "TOUR-2026-002",
        bookingStatus: "pending",
        customerName: "Jane Smith",
        customerNumber: "+91 87654 32109",
        tourName: "Kerala Backwaters",
        paymentStatus: "pending",
        createdAt: "2026-01-09T14:20:00Z",
    },
    {
        id: "BK003",
        bookingId: "TOUR-2026-003",
        bookingStatus: "confirmed",
        customerName: "Mike Johnson",
        customerNumber: "+91 76543 21098",
        tourName: "Himalayan Adventure",
        paymentStatus: "paid",
        createdAt: "2026-01-10T09:15:00Z",
    },
    {
        id: "BK004",
        bookingId: "TOUR-2026-004",
        bookingStatus: "cancelled",
        customerName: "Sarah Williams",
        customerNumber: "+91 65432 10987",
        tourName: "Rajasthan Heritage",
        paymentStatus: "refunded",
        createdAt: "2026-01-05T16:45:00Z",
    },
    {
        id: "BK005",
        bookingId: "TOUR-2026-005",
        bookingStatus: "confirmed",
        customerName: "David Brown",
        customerNumber: "+91 54321 09876",
        tourName: "Goa Beach Retreat",
        paymentStatus: "partial",
        createdAt: "2026-01-07T11:00:00Z",
    },
]


export type FilterType = {
    search: string | undefined;
    sort: string | undefined;
}

export type FilterFields = keyof FilterType;


const BookingsPage: React.FC = () => {
    // here we will fetch the bookings data from the api
    const [filters, setFilters] = useState<FilterType>({
        search: undefined,
        sort: undefined,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const handleFilterChange = (name: FilterFields, value: string | undefined) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Filter and sort bookings
    const filteredBookings = useMemo(() => {
        let result = [...mockBookings];

        // Search filter
        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            result = result.filter((booking) => 
                booking.customerName.toLowerCase().includes(searchLower) ||
                booking.bookingId.toLowerCase().includes(searchLower) ||
                booking.tourName.toLowerCase().includes(searchLower) ||
                booking.customerNumber.includes(searchLower)
            );
        }

        // Sort filter
        if (filters.sort) {
            result.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                
                if (filters.sort === 'createdAt_desc') {
                    return dateB - dateA;
                } else if (filters.sort === 'createdAt_asc') {
                    return dateA - dateB;
                }
                return 0;
            });
        }

        return result;
    }, [debouncedSearch, filters.sort]);

    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Bookings</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View and manage all tour bookings
                    </Typography>
                </div>
            </div>

            <BookingFilter filter={filters} onChange={handleFilterChange} />
            <BookingsTable bookingsList={filteredBookings} />
        </div>
    )
}

export default BookingsPage
