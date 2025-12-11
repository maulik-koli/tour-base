"use client"
import React from 'react'
import { CldImage } from 'next-cloudinary';
import { useUploadImage } from '@/hooks/useUploadImage';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import { FieldDescription, FieldLabel } from '@/components/ui/field';
import { CustomSpinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';

interface ImageDropzoneProps {
    value: string | null;
    onChange: (value: string) => void;
    label?: string;
    containerClass?: string;
    imageClassName?: string;
}


const ImageDropzone: React.FC<ImageDropzoneProps> = ({ containerClass, label, value, onChange, imageClassName }) => {
    const { 
        getRootProps, 
        getInputProps, 
        isDragActive, 
        uploadError, 
        isUploading, 
    } = useUploadImage({ 
        imageType: 'tours',
        onUploadComplete: (url) => {
            onChange(url);
        },
    });

    const previewImage = value;


    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 min-h-50 max-h-50 flex items-center justify-center hover:border-primary/70",
                    isDragActive ? "border-primary" : "border-border",
                    imageClassName
                )}
            >   
                <input {...getInputProps()} />
                {isUploading ? (
                    <div className='flex flex-col gap-1'>
                        <CustomSpinner />
                        <Typography variant="small">Uploading...</Typography>
                    </div>   
                ) : previewImage ? (
                    <div className='relative w-full h-full bg-muted rounded-xl'>
                        <CldImage 
                            src={previewImage}
                            fill
                            crop="fill"
                            alt=""
                            sizes="100vw"
                            className='rounded-xl'
                        />
                    </div>
                ):(
                    <div className="flex flex-col gap-2">
                        <Icon name="Image" className="mx-auto h-12 w-12 text-muted-foreground/80" />
                        <div className='flex flex-col gap-1'>
                            <Typography variant="p">
                                Drop image here or click to upload
                            </Typography>
                            <Typography variant="muted" >
                                Only JPG, JPEG, PNG, WEBP are allowed
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