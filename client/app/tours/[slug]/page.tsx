import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { reverseSlugify } from '@/lib/reverseSlugify';
import TourDetailLoading from './loading';

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

// for now have done this with statis data generation from param
// but for better have to fetch from api with slug and then generate metadata
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
    const { slug } = await params;

    const tourTitle = reverseSlugify(slug);

    return {
        title: `${tourTitle} Tour Package`,
        description: `Book the ${tourTitle} tour package with curated itineraries, best prices, and hassle-free travel planning.    Explore destinations with Eklavyatourism.`,
        keywords: [
            `${tourTitle} tour`,
            `${tourTitle} tour package`,
            "holiday tour package",
            "travel tour",
            "eklavya tourism",
        ],
        alternates: {
            canonical: `/tours/${slug}`,
        },
    };
}

const TourDetailPageComponent = dynamic(
    () => import("@modules/tours/components/tour-detail-page-comp"),
    {
        loading: () => <TourDetailLoading />,
    }
);


export default async function TourDetailPage({ params }: PageProps) {
    const { slug } = await params;
    return <TourDetailPageComponent slug={slug} />;
}