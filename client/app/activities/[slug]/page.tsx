import React from 'react'
import dynamic from 'next/dynamic'
import PageLoader from '@/components/page-loader'

interface ActivityDetailPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ActivityDetailPageProps) {
    const { slug } = await params;
    // In real implementation, fetch activity data here for dynamic metadata
    const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return {
        title: `${title} | Activities`,
        description: `Book ${title} and enjoy an amazing experience.`,
        alternates: {
            canonical: `/activities/${slug}`,
        },
    };
}

const ActivityDetailPageComponent = dynamic(
    () => import("@modules/activities/components/activity-detail-page-component"),
    {
        loading: () => <PageLoader />,
    }
);


const ActivityDetailPage: React.FC<ActivityDetailPageProps> = async ({ params }) => {
    const { slug } = await params;
    return <ActivityDetailPageComponent slug={slug} />
}

export default ActivityDetailPage
