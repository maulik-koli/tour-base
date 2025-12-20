import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";

import { logger } from "@/lib/utils";
import { UPLOAD_CONFIG, UploadConfigsType } from "@/module/media/utils/mediaUpload";
import { useCreateSignature, useUploadToCloudinary } from "@/module/media/api/mutations";

type UseUploadImageArgs = {
    imageType: UploadConfigsType;
    onUploadComplete: (urls: string) => void;
}


export const useUploadImage = ({ imageType, onUploadComplete } : UseUploadImageArgs) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const { mutateAsync: createSignature, isPending: isCreatingSignature } = useCreateSignature();
    const { mutateAsync: uploadToCloudinary, isPending: isUploading } = useUploadToCloudinary();
    

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if(acceptedFiles.length === 0) return;

        logger('Dropped files:', acceptedFiles);
        setUploading(true);
        setUploadError(null);

        try {
            const file = acceptedFiles[0];
            const fileFormat = file.name.split('.').pop()?.toLowerCase();
            const fileSize = file.size;

            const signatureRes = await createSignature({ 
                fileFormat: fileFormat || '',
                mediaType: imageType,
                fileSize: fileSize,
            });

            if(!signatureRes?.data) {
                throw new Error('Failed to obtain upload signature.');
            }

            const signatureData = signatureRes.data;

            const uploadResult = await uploadToCloudinary({
                data: signatureData,
                file,
            });

            logger('Uploaded:', {
                name: file.name,
                uploadResult
            });

            onUploadComplete(uploadResult.url);
        }
        catch (error: any) {
            logger('Error during upload process:', error);

            if(error instanceof AxiosError) {
                const apiErr = error.response?.data.error.message;
                if(apiErr) {
                    setUploadError(apiErr);
                    return;
                }
            }
            
            setUploadError(error?.message || 'An unexpected error occurred during upload.');
        }
        finally {
            setUploading(false);
        }
    }, [createSignature, uploadToCloudinary, imageType, onUploadComplete]);


    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        onDrop,
        accept: {  
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
            "image/webp": [],
        },
        maxFiles: 1,
        maxSize: UPLOAD_CONFIG[imageType],
        multiple: false,
        disabled: uploading
    });


    useEffect(() => {
        if(isDragReject && fileRejections.length > 0) {
            const file = fileRejections[0]
            const maxSizeMB = UPLOAD_CONFIG[imageType] / (1024 * 1024);
            
            if(file.errors[0].code === 'file-too-large') {
                setUploadError(`File "${file.file.name}" is too large. Max size is ${maxSizeMB}MB.`);
            }
            else if (file.errors[0].code === 'file-invalid-type') {
                // also match this with useDropzone accept types
                setUploadError(`File "${file.file.name}" has invalid type. Only JPG, JPEG, PNG, WEBP are allowed.`);
            }
            else {
                setUploadError(`File "${file.file.name}" was rejected.`);
            }
        }
    }, [isDragReject, fileRejections, imageType]);


    return {
        uploadError,
        isUploading: uploading || isCreatingSignature || isUploading,
        getRootProps, 
        getInputProps, 
        isDragActive,
    }
}