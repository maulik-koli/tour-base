'use client'
import React, { useState } from 'react'
import { useGetTourDetail } from '@modules/tours/api/queries';

import TourDetail from '@modules/tours/components/tour-details';
import TourThumbnail from '@/modules/tours/components/tour-thumbnail';
import TourPackageSide from '@/modules/tours/components/tour-package-side';
import TourPackageTabs from '@/modules/tours/components/tour-package-tabs';
import BookContactButtons from '@modules/booking/components/book-contact-btn';

import HelpBlock from '@/components/help-black';
import ErrorBlock from '@/components/error-block';
import { SpinnerOverlay } from '@ui/spinner';


const TourDetailPageComponent: React.FC<{ slug: string}> = ({ slug }) => {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

    const { data, isLoading, error } = useGetTourDetail({
        slug: slug
    })

    if (isLoading) {
        return <div className='h-screen'><SpinnerOverlay /></div>
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
            <div className='w-full py-6 md:py-8 lg:py-12 px-4 md:px-12 lg:px-20'>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    <div className="lg:col-span-2 flex flex-col space-y-6 md:space-y-8">
                        <TourDetail
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

                    <div className="hidden lg:block lg:col-span-1">
                        <div className='sticky top-22 self-start'>
                            <div className='flex flex-col space-y-4 md:space-y-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto scroll-container'>
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

export default TourDetailPageComponent
