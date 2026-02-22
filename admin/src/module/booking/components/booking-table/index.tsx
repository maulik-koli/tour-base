"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { BookingListType } from '@module/booking/api/types'
import { cn, formatDate } from '@/lib/utils'

import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Card, CardContent } from '@ui/card'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { getBookingStatusStyles, getPaymentStatusStyles } from '@module/booking/utils/getStatusStyle'

interface BookingsTableProps {
    bookingsList: BookingListType[]
}


const BookingsTable: React.FC<BookingsTableProps> = ({ bookingsList }) => {
    const router = useRouter()
    const handleEdit = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }

    return (
        <Card className='w-full'>
            <CardContent className='px-0 overflow-x-auto'>
                <Table className='min-w-[1000px]'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='pl-4 md:pl-6 text-xs md:text-sm'>Sr No.</TableHead>
                            <TableHead className='text-xs md:text-sm'>Booking ID</TableHead>
                            <TableHead className='text-xs md:text-sm'>Customer Name</TableHead>
                            <TableHead className='text-xs md:text-sm'>Customer Number</TableHead>
                            <TableHead className='text-xs md:text-sm'>Tour Name</TableHead>
                            <TableHead className='text-xs md:text-sm'>Created At</TableHead>
                            <TableHead className='text-xs md:text-sm'>Booking Status</TableHead>
                            <TableHead className='text-xs md:text-sm'>Payment Status</TableHead>
                            <TableHead className='pr-4 md:pr-6 text-xs md:text-sm'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookingsList.map((booking, index) => (
                            <TableRow key={booking._id}>
                                <TableCell className='pl-4 md:pl-6 font-medium text-xs md:text-sm'>
                                    {index + 1}
                                </TableCell>
                                <TableCell className='font-medium text-xs md:text-sm'>
                                    {booking._id}
                                </TableCell>
                                <TableCell className='text-xs md:text-sm'>{booking.customerName || '-'}</TableCell>
                                <TableCell className='text-xs md:text-sm'>{booking.customerNumber || '-'}</TableCell>
                                <TableCell className='max-w-40 truncate text-xs md:text-sm'>
                                    {booking.tourName}
                                </TableCell>
                                <TableCell className='font-medium text-xs md:text-sm'>
                                    {formatDate(booking.createdAt)}
                                </TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-medium capitalize",
                                        getBookingStatusStyles(booking.bookingStatus)
                                    )}>
                                        {booking.bookingStatus.replace(/_/g, ' ')}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-medium capitalize",
                                        getPaymentStatusStyles(booking.orderStatus || "")
                                    )}>
                                        {booking.orderStatus || "Not Initiated"}
                                    </span>
                                </TableCell>
                                <TableCell className='pr-4 md:pr-6'>
                                    <Button 
                                        variant="outline"
                                        size="icon"
                                        type='button'
                                        onClick={() => handleEdit(booking._id)}
                                        className='h-8 w-8 md:h-9 md:w-9'
                                    >
                                        <Icon name="Pencil" className='w-3.5 h-3.5 md:w-4 md:h-4' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default BookingsTable