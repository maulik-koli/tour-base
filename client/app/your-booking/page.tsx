import React from 'react'
import dynamic from 'next/dynamic';
import PageLoader from '@/components/page-loader';

export const metadata = {
    title: "Your Booking",
    description: "View and manage your tour bookings with Eklavya Tourism. Check booking details and status.",
    alternates: {
        canonical: "/your-booking",
    },
};

const RequestComponent = dynamic(
    () => import("@modules/user-booking/components/request-component"),
    {
        loading: () => <PageLoader />,
    }
);

const YourBookingPage: React.FC = () => {
    return <RequestComponent />
}

export default YourBookingPage
