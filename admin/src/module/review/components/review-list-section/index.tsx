"use client"
import React, { useState } from 'react'
import { ReviewItem } from '@module/review/api/types'
import { ReviewFormType } from '@module/review/utils/schema'
import { useUpdateReview, useDeleteReview } from '@module/review/api/mutations'
import { useToast } from '@/hooks/useToast'
import { useModelStore } from '@/store'

import ReviewCard from '../review-card'
import ReviewForm from '../review-form'
import { Typography } from '@ui/typography'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface ReviewListSectionProps {
    reviews: ReviewItem[];
    tourId: string;
}


const ReviewListSection: React.FC<ReviewListSectionProps> = ({ reviews, tourId }) => {
    const toast = useToast();
    const showModel = useModelStore(s => s.showModel);
    const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

    const { mutate: updateReview, isPending: isUpdating } = useUpdateReview(tourId);
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview(tourId);

    const handleUpdateReview = (reviewId: string, data: ReviewFormType) => {
        updateReview({
            reviewId,
            data: {
                reviewerName: data.reviewerName,
                rating: data.rating,
                comment: data.comment,
                imageUrl: data.imageUrl,
            }
        }, {
            onSuccess: () => {
                toast.success('Review updated successfully');
                setExpandedReviewId(null);
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to update review');
            }
        });
    };

    const handleDeleteReview = (reviewId: string) => {
        showModel(() => {
            deleteReview({ reviewId }, {
                onSuccess: () => {
                    toast.success('Review deleted successfully');
                },
                onError: (error) => {
                    toast.error(error.message || 'Failed to delete review');
                }
            });
        }, {
            title: 'Delete Review',
            description: 'Are you sure you want to delete this review? This action cannot be undone.',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    };

    toast.isLoading(isDeleting, 'Deleting review...');

    if (reviews.length === 0) {
        return (
            <div className='w-full bg-card border border-border rounded-lg p-8 text-center'>
                <Typography variant="muted">
                    No reviews yet. Add the first review using the form above.
                </Typography>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-3'>
            <Typography variant="h4" className='font-semibold'>
                Reviews ({reviews.length})
            </Typography>
            
            <div className='flex flex-col gap-3'>
                {reviews.map((review) => (
                    <Collapsible
                        key={review._id}
                        open={expandedReviewId === review._id}
                        onOpenChange={(open) => 
                            setExpandedReviewId(open ? review._id : null)
                        }
                    >
                        <CollapsibleTrigger asChild>
                            <div>
                                <ReviewCard
                                    review={review}
                                    onDelete={() => handleDeleteReview(review._id)}
                                    isExpanded={expandedReviewId === review._id}
                                />
                            </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className='pt-3'>
                            <div className='bg-muted/30 border border-border rounded-lg p-4'>
                                <Typography variant="p" className='font-medium mb-4'>
                                    Edit Review
                                </Typography>
                                <ReviewForm
                                    defaultValues={{
                                        reviewerName: review.reviewerName,
                                        rating: review.rating,
                                        comment: review.comment,
                                        imageUrl: review.imageUrl,
                                    }}
                                    onSubmit={(data) => handleUpdateReview(review._id, data)}
                                    isPending={isUpdating}
                                    submitLabel='Update Review'
                                    onCancel={() => setExpandedReviewId(null)}
                                />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
};

export default ReviewListSection;
