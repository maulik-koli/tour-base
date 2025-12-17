'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { logger } from '@/lib/utils';

import TourDetailComponent from '@/modules/tours/components/tour-detail-component';
import TourThumbnail from '@/modules/tours/components/tour-thumbnail';
import TourPackageSide from '@/modules/tours/components/tour-package-side';
import TourPackageTabs from '@/modules/tours/components/tour-package-tabs';
import HelpBlock from '@/components/help-black';


const TourDetailPage: React.FC = () => {
    const { tourSlug } = useParams();
    
    // call api with tourSlug
    const callApi = () => {
        logger("Tour Slug:", tourSlug); 
    }
    
    return (
        <div className='flex flex-col'>
            <TourThumbnail />
            <div className='w-full py-12 px-20'>
                <div className="grid grid-cols-3 gap-12">
                    <div className="col-span-2 flex flex-col space-y-8">
                        <TourDetailComponent />
                        <TourPackageTabs />
                    </div>

                    <div className="col-span-1">
                        <div className='sticky top-22 self-start'>
                            <div className='flex flex-col space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto scroll-container'>
                                <TourPackageSide />
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
