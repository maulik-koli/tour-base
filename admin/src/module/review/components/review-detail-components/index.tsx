"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useGetTourReviews } from '@module/review/api/queries'
import { useCreateReview } from '@module/review/api/mutations'
import { ReviewFormType } from '@module/review/utils/schema'
import { useToast } from '@/hooks/useToast'

import ErrorBlock from '@/components/error-block'
import FallbackImage from '@/components/fallback-image'
import ReviewForm from '../review-form'
import ReviewListSection from '../review-list-section'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import { CustomSpinner } from '@ui/spinner'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Icon from '@/components/icons'


const ReviewDetailComponents: React.FC = () => {
    const { tourId } = useParams() as { tourId: string };
    const toast = useToast();
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const { data, error, isLoading } = useGetTourReviews({ tourId });
    const { mutate: createReview, isPending: isCreating } = useCreateReview();

    const handleCreateReview = (formData: ReviewFormType) => {
        createReview({
            tourId,
            data: {
                reviewerName: formData.reviewerName,
                rating: formData.rating,
                comment: formData.comment,
                imageUrl: formData.imageUrl,
            }
        }, {
            onSuccess: () => {
                toast.success('Review added successfully');
                setIsAddFormOpen(false);
            },
            onError: (err) => {
                toast.error(err.message || 'Failed to add review');
            }
        });
    };

    if (isLoading) {
        return (
            <CustomSpinner
                className='w-full min-h-80 flex items-center justify-center' 
            />
        );
    }

    if (error) {
        return (
            <ErrorBlock
                type='error' 
                message={error.message} 
                description='Please try again later.'
            />
        );
    }

    if (!data || !data.data) {
        return (
            <ErrorBlock 
                type='no-data'
                message='Tour not found.'
                description='The requested tour does not exist.'
            />
        );
    }

    const { tour, reviews } = data.data;

    return (
        <div className='flex flex-col gap-6'>
            {/* Tour Info Header */}
            <div className='flex items-start gap-4 bg-card border border-border rounded-lg p-4'>
                <div className='relative w-24 h-24 shrink-0 rounded-md overflow-hidden'>
                    <FallbackImage
                        src={tour.thumbnailImage}
                        alt={tour.name}
                        fill
                        className='object-cover'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h3" className='font-semibold'>
                        {tour.name}
                    </Typography>
                    <Typography variant="muted">
                        Slug: {tour.slug}
                    </Typography>
                    <Typography variant="small" className='text-primary'>
                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </Typography>
                </div>
            </div>

            {/* Add Review Section */}
            <Collapsible open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
                <CollapsibleTrigger asChild>
                    <Button 
                        variant={isAddFormOpen ? "secondary" : "default"}
                        className='w-fit'
                    >
                        <Icon name={isAddFormOpen ? "X" : "Plus"} />
                        {isAddFormOpen ? 'Close Form' : 'Add Review'}
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className='pt-4'>
                    <div className='bg-card border border-border rounded-lg p-4'>
                        <Typography variant="p" className='font-medium mb-4'>
                            Add New Review
                        </Typography>
                        <ReviewForm
                            onSubmit={handleCreateReview}
                            isPending={isCreating}
                            submitLabel='Add Review'
                            onCancel={() => setIsAddFormOpen(false)}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {/* Reviews List */}
            <ReviewListSection reviews={reviews} tourId={tourId} />
        </div>
    );
};

export default ReviewDetailComponents;
