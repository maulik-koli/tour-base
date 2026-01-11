"use client"
import React from 'react'
import { useTourFilters } from '@/hooks/useTourFilters'
import { PaginationType } from '@/types/api'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@ui/pagination'

interface PaginationComponentProps {
    pagination: PaginationType
}


const PaginationComponent: React.FC<PaginationComponentProps> = ({ pagination }) => {
    const { filter, applyFilters } = useTourFilters()

    const { page, totalPages, isPrevPage, isNextPage } = pagination

    const handlePageChange = (newPage: number) => {
        applyFilters({ ...filter, page: newPage }, false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const getVisiblePages = (): number[] => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (page === 1) {
            return [1, 2, 3]
        }

        if (page === totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages]
        }

        return [page - 1, page, page + 1]
    }

    const visiblePages = getVisiblePages()
    const showStartEllipsis = visiblePages[0] > 1
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages

    if (totalPages <= 1) return null

    return (
        <div className='w-full flex justify-center py-6'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => isPrevPage && handlePageChange(page - 1)}
                            className={!isPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>

                    {showStartEllipsis && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handlePageChange(1)}
                                    className='cursor-pointer'
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        </>
                    )}

                    {visiblePages.map((pageNum) => (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                onClick={() => handlePageChange(pageNum)}
                                isActive={page === pageNum}
                                className='cursor-pointer'
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {showEndEllipsis && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handlePageChange(totalPages)}
                                    className='cursor-pointer'
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => isNextPage && handlePageChange(page + 1)}
                            className={!isNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationComponent
