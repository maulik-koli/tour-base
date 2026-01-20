import React from 'react'
import dynamic from 'next/dynamic'
import PageLoader from '@/components/page-loader'

export const metadata = {
    title: "Activities & Experiences",
    description: "Discover amazing activities and experiences in beautiful destinations. Book walking tours, boat cruises, cooking classes and more.",
    keywords: [
        "activities",
        "experiences",
        "walking tours",
        "boat cruises",
        "cooking classes",
        "local experiences",
    ],
    alternates: {
        canonical: "/activities",
    },
};

const ActivitiesPageComponent = dynamic(
    () => import("@modules/activities/components/activities-page-component"),
    {
        loading: () => <PageLoader />,
    }
);


const ActivitiesPage: React.FC = () => {
    return <ActivitiesPageComponent />
}

export default ActivitiesPage
