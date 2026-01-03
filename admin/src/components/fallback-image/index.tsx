import React, { useEffect, useRef } from 'react'
import { CldImage, CldImageProps } from 'next-cloudinary';

const PLACEHOLDER_IMAGE = "https://res.cloudinary.com/dmcfkem87/image/upload/v1766168487/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6_r9pl7b.jpg"


const FallbackImage: React.FC<CldImageProps> = (props) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(props.src);

    const originalConsoleError = useRef(console.error);

    useEffect(() => {
        setImageError(false);
        setImageSrc(props.src);
    }, [props.src]);

    // supress next-cloudinary image load error logs
    useEffect(() => {
        console.error = (...args: any[]) => {
            if (
                typeof args[0] === 'string' && 
                args[0].includes('[CldImage] Failed to load image')
            ) {
                return;
            }
            originalConsoleError.current(...args);
        };

        return () => {
            console.error = originalConsoleError.current;
        };
    }, []);


    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault();
        e.stopPropagation();
        setImageError(true);
    }

    return (
        <CldImage
            {...props}
            loading="eager"
            src={imageError ? PLACEHOLDER_IMAGE : imageSrc || PLACEHOLDER_IMAGE}
            // src={PLACEHOLDER_IMAGE}
            onError={handleError}
        />
    )
}

export default FallbackImage
