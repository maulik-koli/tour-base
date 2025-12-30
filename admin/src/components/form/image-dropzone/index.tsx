"use client"
import React from 'react'
import { useUploadImage } from '@/module/media/utils/useUploadImage';
import { UploadConfigsType } from '@module/media/utils/mediaUpload';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import FallbackImage from '@/components/fallback-image';
import { FieldDescription, FieldLabel } from '@ui/field';
import { CustomSpinner } from '@ui/spinner';
import { Typography } from '@ui/typography';

interface ImageDropzoneProps {
    value: string | null;
    onChange: (value: string) => void;
    imageType: UploadConfigsType
    label?: string;
    containerClass?: string;
    imageClassName?: string;
}


const ImageDropzone: React.FC<ImageDropzoneProps> = ({ containerClass, label, value, onChange, imageClassName, imageType }) => {
    const { 
        getRootProps, 
        getInputProps, 
        isDragActive, 
        uploadError, 
        isUploading, 
    } = useUploadImage({ 
        imageType: imageType,
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
                    "border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 flex items-center justify-center hover:border-primary/70",
                    "h-50 min-h-50",
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
                    <div className='relative w-full h-full min-h-50 bg-muted rounded-xl overflow-hidden'>
                        <FallbackImage 
                            src={previewImage}
                            fill
                            crop="fill"
                            alt="uploaded image"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className='rounded-xl overflow-hidden object-fill'
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