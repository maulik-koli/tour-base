"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import ReviewDetailComponents from '@module/review/components/review-detail-components'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import Icon from '@/components/icons'


const ReviewDetailPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-3'>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => router.push('/reviews')}
                        >
                            <Icon name="ArrowLeft" />
                        </Button>
                        <Typography variant="h2" className='font-semibold'>
                            Tour Reviews
                        </Typography>
                    </div>
                    <Typography variant="small" className='text-muted-foreground font-normal ml-12'>
                        Manage reviews for this tour
                    </Typography>
                </div>
            </div>

            <ReviewDetailComponents />
        </div>
    )
}

export default ReviewDetailPage
