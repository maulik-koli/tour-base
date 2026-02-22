"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { TourReviewListItem } from '@module/review/api/types'

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

interface ReviewTourTableProps {
    tourList: TourReviewListItem[]
    pageOffset?: number
}


const ReviewTourTable: React.FC<ReviewTourTableProps> = ({ tourList, pageOffset = 0 }) => {
    const router = useRouter()

    const handleViewMore = (tourId: string) => {
        router.push(`/reviews/${tourId}`)
    }

    return (
        <Card className='w-full'>
            <CardContent className='px-0 overflow-x-auto'>
                <Table className='min-w-[600px]'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='pl-4 md:pl-6 w-16 md:w-20 text-xs md:text-sm'>Sr No.</TableHead>
                            <TableHead className='text-xs md:text-sm'>Tour Name</TableHead>
                            <TableHead className='w-28 md:w-32 text-center text-xs md:text-sm'>Review Count</TableHead>
                            <TableHead className='pr-4 md:pr-6 w-28 md:w-32 text-center text-xs md:text-sm'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tourList.map((tour, index) => (
                            <TableRow key={tour._id}>
                                <TableCell className='pl-4 md:pl-6 font-medium text-xs md:text-sm'>
                                    {pageOffset + index + 1}
                                </TableCell>
                                <TableCell className='font-medium text-xs md:text-sm'>
                                    {tour.name}
                                </TableCell>
                                <TableCell className='text-center'>
                                    <span className='inline-flex items-center justify-center bg-primary/10 text-primary px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium'>
                                        {tour.reviewCount}
                                    </span>
                                </TableCell>
                                <TableCell className='pr-4 md:pr-6 text-center'>
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        type='button'
                                        onClick={() => handleViewMore(tour._id)}
                                        className='gap-1 text-xs md:text-sm px-2 md:px-3'
                                    >
                                        <Icon name="Eye" className='w-3 h-3 md:w-4 md:h-4' />
                                        <span className='hidden sm:inline'>View More</span>
                                        <span className='sm:hidden'>View</span>
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

export default ReviewTourTable
