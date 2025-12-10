import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";

import { logger } from "@/lib/utils";
import { UPLOAD_CONFIG, UploadConfigsType } from "@/lib/mediaUpload";
import { useCreateSignature, useUploadToCloudinary } from "@/module/tours/apis/mutations";

type UseUploadImageArgs = {
    upload: "single" | "multiple";
    imageType: UploadConfigsType;
}


export const useUploadImage = ({ upload, imageType } : UseUploadImageArgs) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    const { mutateAsync: createSignature } = useCreateSignature();
    const { mutateAsync: uploadToCloudinary } = useUploadToCloudinary();
    

    const onDrop = async (acceptedFiles: File[]) => {
        if(acceptedFiles.length === 0) return;

        logger('Dropped files:', acceptedFiles);
        setUploading(true);
        setUploadError(null);

        const fileFormat = acceptedFiles[0]?.name.split('.').pop()?.toLowerCase();
        const fileSize = acceptedFiles[0]?.size || 0;

        try {
            const signatureRes = await createSignature({ 
                fileFormat: fileFormat || '',
                mediaType: imageType,
                fileSize: fileSize,
            });

            if(!signatureRes?.data) {
                throw new Error('Failed to obtain upload signature.');
            }

            const signatureData = signatureRes.data;

            const uploadClodinary = await uploadToCloudinary({
                data: signatureData,
                file: acceptedFiles[0],
            });

            logger('Upload to Cloudinary successful:', uploadClodinary);

            setPreviews(prev => {
                const newPreviews = upload === "multiple" ? [...prev, uploadClodinary.url] : [uploadClodinary.url];
                return newPreviews;
            });

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
            if(error?.message) {
                setUploadError(error.message);
            }
            else {
                setUploadError('An unexpected error occurred during upload.');
            }
        }
        finally {
            setUploading(false);
        }
    }

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        onDrop,
        accept: {  
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
            "image/webp": [],
        },
        maxFiles: 5,
        maxSize: UPLOAD_CONFIG[imageType],
        multiple: upload === "multiple",
        disabled: false
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
    }, [isDragReject, fileRejections]);

    return {
        uploadError,
        uploading,
        getRootProps, 
        getInputProps, 
        isDragActive,
        previews,
    }
}