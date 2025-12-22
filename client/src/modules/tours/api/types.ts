import { PaginationType } from "@/types/api";

export type TourListType = {
    _id: string,
    name: string
    slug: string,
    tagLine: string,
    thumbnailImage: string,
    minPrice: number,
    maxPrice: number
    minDays: number,
    maxDays: number,
    packageCount: number,
    createdAt: string,
    updatedAt: string,
}

export interface GetToursParams {
    maxPrice?: number;
    duration?: string;
    sort?: string;
    category?: string;
    search?: string;
}

export interface GetToursResponse {
    pagination: PaginationType,
    tours: TourListType[]
}

export interface GetTourDetailParam {
    slug: string;
}

type TourDayPlan = {
    title: string;
    subtitle: string;
    description: string;
};

export type Tour = {
    _id: string;
    name: string;
    tagLine: string;
    description: string;
    includes: string[];
    excludes: string[];
    categories: string[];
    slug: string;
    dayPlans: TourDayPlan[];
    isActive: boolean;
    images: string[];
    thumbnailImage: string;
    youtubeVideoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

type PackageHotel = {
    hotelName: string;
    city: string;
    nightNo: number;
};

export type TourPackage = {
    _id: string;
    tourId: string;
    name: string;
    days: number;
    nights: number;
    pricePerPerson: number;
    starHierarchy: number;
    startCity: string;
    endCity: string;
    hotels: PackageHotel[];
    createdAt: string;
    updatedAt: string;
};


export interface GetTourDetailResponse {
    tour: Tour;
    packages: TourPackage[];
}

export const DUMMY_TOURS: TourListType[] = [
    {
        _id: "1",
        name: "Himalayan Adventure",
        slug: "himalayan-adventure",
        tagLine: "Explore the majestic Himalayas",
        thumbnailImage: "",
        minPrice: 15000,
        maxPrice: 45000,
        minDays: 5,
        maxDays: 12,
        packageCount: 4,
        createdAt: "2024-01-10T10:30:00.000Z",
        updatedAt: "2024-01-15T12:00:00.000Z",
    },
    {
        _id: "2",
        name: "Rajasthan Heritage Tour",
        slug: "rajasthan-heritage-tour",
        tagLine: "A journey through royal history",
        thumbnailImage: "",
        minPrice: 12000,
        maxPrice: 35000,
        minDays: 4,
        maxDays: 10,
        packageCount: 5,
        createdAt: "2024-02-05T09:20:00.000Z",
        updatedAt: "2024-02-07T11:45:00.000Z",
    },
    {
        _id: "3",
        name: "Kerala Backwaters",
        slug: "kerala-backwaters",
        tagLine: "Relax in God’s Own Country",
        thumbnailImage: "",
        minPrice: 10000,
        maxPrice: 28000,
        minDays: 3,
        maxDays: 8,
        packageCount: 3,
        createdAt: "2024-03-01T08:15:00.000Z",
        updatedAt: "2024-03-03T10:10:00.000Z",
    },
    {
        _id: "4",
        name: "Spiritual Varanasi",
        slug: "spiritual-varanasi",
        tagLine: "Experience India’s spiritual heart",
        thumbnailImage: "",
        minPrice: 8000,
        maxPrice: 20000,
        minDays: 2,
        maxDays: 6,
        packageCount: 2,
        createdAt: "2024-03-20T07:00:00.000Z",
        updatedAt: "2024-03-22T09:30:00.000Z",
    },
    {
        _id: "5",
        name: "Goa Leisure Escape",
        slug: "goa-leisure-escape",
        tagLine: "Sun, sand, and serenity",
        thumbnailImage: "",
        minPrice: 9000,
        maxPrice: 25000,
        minDays: 3,
        maxDays: 7,
        packageCount: 6,
        createdAt: "2024-04-02T11:40:00.000Z",
        updatedAt: "2024-04-05T14:00:00.000Z",
    },
    {
        _id: "6",
        name: "North East Explorer",
        slug: "north-east-explorer",
        tagLine: "Unexplored beauty of India",
        thumbnailImage: "",
        minPrice: 18000,
        maxPrice: 50000,
        minDays: 6,
        maxDays: 14,
        packageCount: 4,
        createdAt: "2024-04-15T06:50:00.000Z",
        updatedAt: "2024-04-18T08:20:00.000Z",
    },
];


export const DUMMY_TOUR: GetTourDetailResponse = {
    tour: {
        _id: "6946fb5f8bedfcf1a1cd2059",
        name: "The Name Tour",
        tagLine: "Nothing has to change, what the hell",
        description:
        "The details and the description of the tour that will show the user about what this tour is even about",
        includes: ["Breakfast", "Sightseeing", "Local transport"],
        excludes: ["Flights", "Personal expenses"],
        categories: [
            "69457de82f9499279c5a4af2",
            "6946f011e8de30fc0705fe3b",
        ],
        slug: "the-name-tour",
        dayPlans: [
        {
            title: "Day 1",
            subtitle: "Arrival and local exploration",
            description:
            "<p>Arrival at destination and local sightseeing. <strong>Evening free</strong>.</p>",
        },
        {
            title: "Day 2",
            subtitle: "Main attractions",
            description:
            "<ul class=\"list-disc ml-5\"><li><p>Visit famous spots</p></li><li><p>Local market</p></li></ul>",
        },
        {
            title: "Day 3",
            subtitle: "Departure",
            description:
            "<p>Checkout from hotel and departure.</p>",
        },
        ],
        isActive: true,
        images: [
            "https://res.cloudinary.com/dmcfkem87/image/upload/v1766259431/tours/nwlvwlemioikl71z5bqv.jpg",
            "https://res.cloudinary.com/dmcfkem87/image/upload/v1766259444/tours/egyjngjneduwukg4imre.jpg",
        ],
        thumbnailImage:
            "https://res.cloudinary.com/dmcfkem87/image/upload/v1766259430/tours/vlf48so69kt87ig39lde.jpg",
        youtubeVideoUrl: null,
        createdAt: "2025-12-20T19:39:11.128Z",
        updatedAt: "2025-12-21T08:25:08.807Z",
    },

    packages: [
        {
            _id: "6946fb5f8bedfcf1a1cd205b",
            tourId: "6946fb5f8bedfcf1a1cd2059",
            name: "Budget Package",
            days: 2,
            nights: 1,
            pricePerPerson: 7000,
            starHierarchy: 1,
            startCity: "Starting Point",
            endCity: "Ending Point",
            hotels: [
                {
                    hotelName: "Hotel Z",
                    city: "City Y",
                    nightNo: 1,
                },
            ],
            createdAt: "2025-12-20T19:39:11.329Z",
            updatedAt: "2025-12-20T19:39:11.329Z",
        },
        {
            _id: "6946fb5f8bedfcf1a1cd205c",
            tourId: "6946fb5f8bedfcf1a1cd2059",
            name: "Standard Package",
            days: 4,
            nights: 3,
            pricePerPerson: 15000,
            starHierarchy: 3,
            startCity: "Starting Point",
            endCity: "Ending Point",
            hotels: [
                {
                    hotelName: "Hotel A",
                    city: "City Y",
                    nightNo: 2,
                },
                {
                    hotelName: "Hotel B",
                    city: "City Z",
                    nightNo: 1,
                },
            ],
            createdAt: "2025-12-20T19:45:11.329Z",
            updatedAt: "2025-12-20T19:45:11.329Z",
        },
        {
            _id: "6946fb5f8bedfcf1a1cd205d",
            tourId: "6946fb5f8bedfcf1a1cd2059",
            name: "Premium Package",
            days: 6,
            nights: 5,
            pricePerPerson: 28000,
            starHierarchy: 5,
            startCity: "Starting Point",
            endCity: "Ending Point",
            hotels: [
                {
                    hotelName: "Luxury Resort X",
                    city: "City Y",
                    nightNo: 3,
                },
                {
                    hotelName: "Premium Hotel Y",
                    city: "City Z",
                    nightNo: 2,
                },
            ],
            createdAt: "2025-12-20T19:50:11.329Z",
            updatedAt: "2025-12-20T19:50:11.329Z",
        },
    ],
}