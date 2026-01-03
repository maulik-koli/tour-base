'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useGetTourDetail } from '@modules/tours/api/queries';

import TourDetailComponent from '@/modules/tours/components/tour-detail-component';
import TourThumbnail from '@/modules/tours/components/tour-thumbnail';
import TourPackageSide from '@/modules/tours/components/tour-package-side';
import TourPackageTabs from '@/modules/tours/components/tour-package-tabs';
import BookContactButtons from '@modules/booking/components/book-contact-btn';

import HelpBlock from '@/components/help-black';
import ErrorBlock from '@/components/error-block';
import { SpinnerOverlay } from '@ui/spinner';


const TourDetailPage: React.FC = () => {
    const { tourSlug } = useParams();
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

    const { data, isLoading, error } = useGetTourDetail({
        slug: tourSlug as string
    })

    if (isLoading) {
        return <SpinnerOverlay />
    }
    else if (error) {
        return <ErrorBlock type='error' message={error.message} />
    }
    else if (!data?.data?.tour || !data?.data?.packages || !data?.data.tour) {
        return <ErrorBlock type='no-data' message="Tour not found!" />
    }

    const tourData = data.data.tour;
    const packagesData = data.data.packages;
    const selectedPackageData = packagesData.find(pkg => pkg._id === selectedPackage);
    
    
    return (
        <div className='flex flex-col'>
            <TourThumbnail
                name={tourData.name}
                thumbnailImage={tourData.thumbnailImage}
                packages={packagesData}
                images={tourData.images}
            />
            <div className='w-full py-12 px-20'>
                <div className="grid grid-cols-3 gap-12">
                    <div className="col-span-2 flex flex-col space-y-8">
                        <TourDetailComponent 
                            tour={tourData}
                            selectedPackage={selectedPackageData}
                        />
                        <TourPackageTabs 
                            packages={packagesData}
                            handleSelectPackage={(id) => setSelectedPackage(id)}
                            selectedPackageId={selectedPackage}
                            bookButtons={
                                <BookContactButtons
                                    tourId={tourData._id}
                                    packageId={selectedPackage || ''}
                                    isDisabled={!selectedPackage}
                                    className='flex-row justify-center gap-4'
                                />
                            }
                        />
                    </div>

                    <div className="col-span-1">
                        <div className='sticky top-22 self-start'>
                            <div className='flex flex-col space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto scroll-container'>
                                <TourPackageSide
                                    packages={packagesData}
                                    handleSelectPackage={(id) => setSelectedPackage(id)}
                                    selectedPackageId={selectedPackage}
                                    bookButtons={
                                        <BookContactButtons
                                            tourId={tourData._id}
                                            packageId={selectedPackage || ''}
                                            isDisabled={!selectedPackage}
                                        />
                                    }
                                />
                                <HelpBlock />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetailPage
