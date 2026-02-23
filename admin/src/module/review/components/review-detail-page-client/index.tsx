"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import ReviewDetailComponents from '@module/review/components/review-detail-components'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import Icon from '@/components/icons'


const ReviewDetailPageClient: React.FC = () => {
    const router = useRouter();

    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <div className='w-full flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => router.push('/reviews')}
                            className='h-8 w-8 md:h-10 md:w-10'
                        >
                            <Icon name="ArrowLeft" className='w-4 h-4 md:w-5 md:h-5' />
                        </Button>
                        <Typography variant="h2" className='font-semibold text-lg md:text-xl lg:text-2xl'>
                            Tour Reviews
                        </Typography>
                    </div>
                    <Typography variant="small" className='text-muted-foreground font-normal ml-10 md:ml-12 text-xs md:text-sm'>
                        Manage reviews for this tour
                    </Typography>
                </div>
            </div>

            <ReviewDetailComponents />
        </div>
    )
}

export default ReviewDetailPageClient
