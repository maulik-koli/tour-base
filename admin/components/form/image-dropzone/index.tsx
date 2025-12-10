"use client"
import React from 'react'
import { useUploadImage } from '@/hooks/useUploadImage';
import { cn, logger } from '@/lib/utils';

import Icon from '@/components/icons';
import { FieldDescription, FieldLabel } from '@/components/ui/field';
import { CustomSpinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';

interface ImageDropzoneProps {
    containerClass?: string;
    label?: string;
}


const ImageDropzone: React.FC<ImageDropzoneProps> = ({ containerClass, label }) => {
    const { 
        getRootProps, 
        getInputProps, 
        isDragActive, 
        uploadError, 
        uploading, 
        previews 
    } = useUploadImage({ 
        imageType: 'tours',
        upload: 'single'
    });

    logger('ImageDropzone previews:', previews);


    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 min-h-50 max-h-50 flex items-center justify-center hover:border-primary/70",
                    isDragActive ? "border-primary" : "border-border"
                )}
            >   
                <input {...getInputProps()} />
                {uploading ? (
                    <div className='flex flex-col gap-1'>
                        <CustomSpinner />
                        <Typography variant="small">Uploading...</Typography>
                    </div>   
                ) : (
                    <div className="flex flex-col gap-2">
                        <Icon name="Image" className="mx-auto h-12 w-12 text-muted-foreground/80" />
                        <div className='flex flex-col gap-1'>
                            <Typography variant="p">
                                Drop thumbnail image here or click to upload
                            </Typography>
                            <Typography variant="muted" >
                                PNG, JPG, GIF up to 10MB
                            </Typography>
                        </div>
                    </div>
                )}
            </div>
            {uploadError && <FieldDescription>{uploadError}</FieldDescription>}
        </div>
    );
}

export default ImageDropzone;