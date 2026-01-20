"use client"
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Thumbs, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import FallbackImage from '@/components/fallback-image'
import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface ActivityImageSliderProps {
    images: string[];
    title: string;
    pricePerPerson: number;
}


const ActivityImageSlider: React.FC<ActivityImageSliderProps> = ({ images, title,pricePerPerson }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    if (images.length === 0) return null;

    return (
        <div className="w-full">
            <div className="relative mb-6">
                <Swiper
                    modules={[Autoplay, Navigation, Thumbs]}
                    loop={true}
                    spaceBetween={10}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{ aspectRatio: '16/9' }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full bg-gray-100">
                                <FallbackImage
                                    src={image}
                                    alt={`${title} - Image ${index + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg z-10">
                        <Typography variant="h4" className='text-primary'>
                            ₹{pricePerPerson.toLocaleString('en-IN')}
                        </Typography>
                        <Typography variant="small">
                            Per Person
                        </Typography>
                    </div>
                </Swiper>

                <Button 
                    variant="outline"
                    className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
                    aria-label="Previous slide"
                    size="icon"
                >
                    <Icon name='ChevronLeft' width={20} height={20} className="mr-0.5" />
                </Button>
                <Button 
                    variant="outline"
                    className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
                    aria-label="Next slide"
                    size="icon"
                >
                    <Icon name='ChevronRight' width={20} height={20} className="ml-0.5" />
                </Button>
            </div>

            {images.length > 1 && (
                <Swiper
                    modules={[FreeMode, Thumbs]}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={1.5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.5,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    className="thumbs-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-28 overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-primary/30">
                                <FallbackImage
                                    src={image}
                                    alt={`${title} - Thumbnail ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 33vw, 20vw"
                                    className="object-cover border-2 border-transparent transition-all duration-300 hover:border-primary/30"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <style jsx global>{`
                .thumbs-swiper .swiper-slide {
                    opacity: 0.4;
                    transition: opacity 0.3s ease;
                }
                
                .thumbs-swiper .swiper-slide-thumb-active {
                    opacity: 1;
                }
                
                .thumbs-swiper .swiper-slide-thumb-active > div {
                    border-color: rgb(59, 130, 246) !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default ActivityImageSlider
