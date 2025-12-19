import React, { useEffect } from 'react'
import { CldImage, CldImageProps } from 'next-cloudinary';

const PLACEHOLDER_IMAGE = "https://res.cloudinary.com/dmcfkem87/image/upload/v1766168487/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6_r9pl7b.jpg"


const FallbackImage: React.FC<CldImageProps> = (props) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(() => {
        if (!props.src.startsWith("https://res.cloudinary.com")) {
            return PLACEHOLDER_IMAGE;
        }
        return props.src;
    });

    useEffect(() => {
        setImageError(false);
        setImageSrc(props.src);
    }, [props.src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault();
        e.stopPropagation();
        setImageError(true);
    }


    return (
        <CldImage
            {...props}
            src={imageError ? PLACEHOLDER_IMAGE : imageSrc || PLACEHOLDER_IMAGE}
            onError={handleError}
        />
    )
}

export default FallbackImage
