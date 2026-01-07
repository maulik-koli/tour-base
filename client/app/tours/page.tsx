import React from 'react'
import dynamic from 'next/dynamic';
import PageLoader from '@/components/page-loader';

export const metadata = {
    title: "All Tour Packages",
    description: "Browse all available tour packages with prices, duration, and destinations.",
    keywords: [
        "tour packages",
        "holiday packages",
        "travel tours",
        "india tour packages",
    ],
    alternates: {
        canonical: "/tours",
    },
};

const TourPageComponent = dynamic(
    () => import("@modules/tours/components/tours-page-components"),
    {
        loading: () => <PageLoader />,
    }
);


const ToursPage: React.FC = () => {
    return <TourPageComponent />
}

export default ToursPage
