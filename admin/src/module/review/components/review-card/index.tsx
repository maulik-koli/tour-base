"use client"
import React from 'react'
import { ReviewItem } from '@module/review/api/types'
import { cn, formatDate } from '@/lib/utils'

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
                    className={cn(
                        'w-3 h-3 md:w-4 md:h-4',
                        star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    )}
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
        <div 
            className={cn(
                "w-full bg-card border border-border rounded-lg p-3 md:p-4 transition-all duration-200 cursor-pointer",
                isExpanded ? 'border-primary/50' : 'hover:border-primary/30'
            )}
        >
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4'>
                {/* Review Image */}
                {review.imageUrl && (
                    <div className='shrink-0 w-full sm:w-16 h-32 sm:h-16 md:w-20 md:h-20 relative rounded-md overflow-hidden'>
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
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Typography variant="p" className='font-semibold text-sm md:text-base'>
                                {review.reviewerName}
                            </Typography>
                            <StarRating rating={review.rating} />
                        </div>
                        
                        <div className='flex items-center gap-1.5 sm:gap-2'>
                            <Typography variant="muted" className='text-[10px] md:text-xs whitespace-nowrap'>
                                {formatDate(review.createdAt)}
                            </Typography>
                            {(onEdit || onDelete) && (
                                <div className='flex items-center gap-0.5 sm:gap-1'>
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit();
                                            }}
                                            className='h-7 w-7 md:h-8 md:w-8'
                                        >
                                            <Icon name="Pencil" className='w-3 h-3 md:w-3.5 md:h-3.5' />
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
                                            className='h-7 w-7 md:h-8 md:w-8 text-destructive hover:text-destructive'
                                        >
                                            <Icon name="Trash2" className='w-3 h-3 md:w-3.5 md:h-3.5' />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <Typography variant="small" className='text-muted-foreground line-clamp-3 text-xs md:text-sm'>
                        {review.comment}
                    </Typography>
                </div>
            </div>

            {/* Expand indicator */}
            <div className='flex items-center justify-center mt-2 pt-2 border-t border-border'>
                <Typography variant="muted" className='text-[10px] md:text-xs flex items-center gap-1'>
                    <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        className='w-3 h-3 md:w-3.5 md:h-3.5'
                    />
                    {isExpanded ? 'Click to collapse' : 'Click to edit'}
                </Typography>
            </div>
        </div>
    );
};

export default ReviewCard;
