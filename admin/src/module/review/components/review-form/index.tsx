"use client"
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    ReviewFormType, 
    reviewFormSchema, 
    defaultReviewFormValues 
} from '@module/review/utils/schema'

import { InputField } from '@/components/form'
import SelectField from '@/components/form/select-field'
import Textarea from '@/components/form/textarea'
import ImageDropzone from '@/components/form/image-dropzone'
import { Button } from '@ui/button'
import Icon from '@/components/icons'

interface ReviewFormProps {
    onSubmit: (data: ReviewFormType) => void;
    defaultValues?: ReviewFormType;
    isPending?: boolean;
    submitLabel?: string;
    onCancel?: () => void;
}

const ratingOptions = [
    { label: '1 Star', value: '1' },
    { label: '2 Stars', value: '2' },
    { label: '3 Stars', value: '3' },
    { label: '4 Stars', value: '4' },
    { label: '5 Stars', value: '5' },
];


const ReviewForm: React.FC<ReviewFormProps> = ({ 
    onSubmit, 
    defaultValues = defaultReviewFormValues,
    isPending = false,
    submitLabel = 'Submit Review',
    onCancel
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ReviewFormType>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Controller
                    control={control}
                    name="reviewerName"
                    render={({ field }) => (
                        <InputField
                            label="Reviewer Name"
                            placeholder="Enter reviewer name"
                            value={field.value}
                            onChange={field.onChange}
                            errMsg={errors.reviewerName?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <SelectField
                            label="Rating"
                            placeholder="Select rating"
                            value={String(field.value)}
                            onChange={(val) => field.onChange(Number(val))}
                            options={ratingOptions}
                        />
                    )}
                />
            </div>

            <Controller
                control={control}
                name="comment"
                render={({ field }) => (
                    <Textarea
                        label="Comment"
                        placeholder="Enter review comment (min 10 characters)"
                        value={field.value}
                        onChange={field.onChange}
                        errMsg={errors.comment?.message}
                        rows={4}
                    />
                )}
            />

            <Controller
                control={control}
                name="imageUrl"
                render={({ field }) => (
                    <ImageDropzone
                        label="Review Image (Optional)"
                        value={field.value || null}
                        onChange={field.onChange}
                        imageType="reviews"
                        containerClass='max-w-md'
                    />
                )}
            />

            <div className='flex items-center gap-3 pt-2'>
                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Icon name="Loader2" className="animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Icon name="Check" />
                            {submitLabel}
                        </>
                    )}
                </Button>
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
