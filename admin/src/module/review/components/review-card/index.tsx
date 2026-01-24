"use client"
import React from 'react'
import { ReviewItem } from '@module/review/api/types'
import { formatDate } from '@/lib/utils'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface ReviewCardProps {
    review: ReviewItem;
    onEdit?: () => void;
    onDelete?: () => void;
    isExpanded?: boolean;
}


const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className='flex items-center gap-0.5'>
            {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                    key={star}
                    name="Star"
                    width={16}
                    height={16}
                    className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
            ))}
        </div>
    );
};


const ReviewCard: React.FC<ReviewCardProps> = ({ 
    review, 
    onEdit, 
    onDelete,
    isExpanded = false
}) => {
    return (
        <div className={`
            w-full bg-card border border-border rounded-lg p-4 
            transition-all duration-200 cursor-pointer
            ${isExpanded ? 'border-primary/50' : 'hover:border-primary/30'}
        `}>
            <div className='flex gap-4'>
                {/* Review Image */}
                {review.imageUrl && (
                    <div className='shrink-0 w-20 h-20 relative rounded-md overflow-hidden'>
                        <FallbackImage
                            src={review.imageUrl}
                            alt={`Review by ${review.reviewerName}`}
                            fill
                            className='object-cover'
                        />
                    </div>
                )}

                {/* Review Content */}
                <div className='flex-1 flex flex-col gap-2 min-w-0'>
                    <div className='flex items-start justify-between gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Typography variant="p" className='font-semibold'>
                                {review.reviewerName}
                            </Typography>
                            <StarRating rating={review.rating} />
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            <Typography variant="muted" className='text-xs whitespace-nowrap'>
                                {formatDate(review.createdAt)}
                            </Typography>
                            {(onEdit || onDelete) && (
                                <div className='flex items-center gap-1'>
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit();
                                            }}
                                            className='h-8 w-8'
                                        >
                                            <Icon name="Pencil" width={14} height={14} />
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete();
                                            }}
                                            className='h-8 w-8 text-destructive hover:text-destructive'
                                        >
                                            <Icon name="Trash2" width={14} height={14} />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <Typography variant="small" className='text-muted-foreground line-clamp-3'>
                        {review.comment}
                    </Typography>
                </div>
            </div>

            {/* Expand indicator */}
            <div className='flex items-center justify-center mt-2 pt-2 border-t border-border'>
                <Typography variant="muted" className='text-xs flex items-center gap-1'>
                    <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        width={14} 
                        height={14} 
                    />
                    {isExpanded ? 'Click to collapse' : 'Click to edit'}
                </Typography>
            </div>
        </div>
    );
};

export default ReviewCard;
