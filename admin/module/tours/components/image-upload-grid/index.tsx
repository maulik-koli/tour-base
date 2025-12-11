import React from 'react'
import { CldImage } from 'next-cloudinary';
import { useController, useFormContext } from 'react-hook-form'
import { useUploadImage } from '@/hooks/useUploadImage';
import { TourFormType } from '../../utils/schema';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import { FieldDescription, FieldLabel } from '@/components/ui/field'
import { CustomSpinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';


const ImageUploadGrid: React.FC = () => {
    const  { control }  = useFormContext<TourFormType>();

    const { field } = useController({
        control,
        name: "images",
    });

    const values = (field.value || []) as string[];


    const handleRemove = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        field.onChange(newValues);
    };

    const handleAppend = (url: string) => {
        const newValues = [...values, url];
        field.onChange(newValues);
    }

    const { 
        getRootProps, 
        getInputProps, 
        isDragActive, 
        uploadError, 
        isUploading, 
    } = useUploadImage({ 
        imageType: 'tours',
        onUploadComplete: (url) => {
            handleAppend(url);
        },
    });
    


    return (
        <div className='flex flex-col gap-1.5'>
            <FieldLabel>Gallery Images</FieldLabel>
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 min-h-35 max-h-35 flex items-center justify-center hover:border-primary/70",
                    isDragActive ? "border-primary" : "border-border"
                )}
            >   
                <input {...getInputProps()} />
                {isUploading ? (
                    <div className='flex flex-col gap-1'>
                        <CustomSpinner />
                        <Typography variant="small">Uploading...</Typography>
                    </div>   
                ) : (
                    <div className="flex flex-col gap-2">
                        <Icon name="Upload" className="mx-auto h-8 w-8 text-muted-foreground/80" />
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
            <div className='mt-1.5'>
                <div className='grid grid-cols-3'>
                   {values.map((value, index) => (
                        <div 
                            key={index}
                            className="group relative max-h-40 aspect-square bg-muted rounded-lg overflow-hidden border border-border "
                        >
                            <CldImage 
                                src={value}
                                fill
                                crop="fill"
                                alt=""
                                sizes="100vw"
                                className='rounded-lg'
                            />
                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemove(index)}
                                className="absolute top-0 right-0 h-6 w-6  rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs"
                                disabled={isUploading}
                            >
                                <Icon name='X' width={8} height={8} stroke='currentColor' />
                            </Button>
                        </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ImageUploadGrid
