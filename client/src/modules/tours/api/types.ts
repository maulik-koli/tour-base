
export type TourCardType = {
    slug: string,
    _id: string,
    title: string,
    subtitle: string,
    minDuration: string,
    maxDuration: string,
    packageCount: number,
    minPrice: number,
    maxPrice: number,
    image: string,
}

export const DUMMY_TOURS: TourCardType[] = [
    {
        _id: "tour_001",
        slug: "himachal-himalayan-escape",
        title: "Himachal Himalayan Escape sgosdgx dogub sougb sob ",
        subtitle: "Snow-capped mountains, cozy valleys, and scenic road trips Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus repellat odio officiis eligendi perferendis sapiente ipsa esse doloremque aliquam. Nam esse at dolorum repudiandae exercitationem perferendis molestias quasi officiis. Nihil?",
        minDuration: "5 Days",
        maxDuration: "7 Days",
        packageCount: 4,
        minPrice: 14999,
        maxPrice: 28999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
    {
        _id: "tour_002",
        slug: "rajasthan-royal-trail",
        title: "Rajasthan Royal Trail",
        subtitle: "Forts, palaces, and timeless desert culture",
        minDuration: "4 Days",
        maxDuration: "6 Days",
        packageCount: 3,
        minPrice: 12999,
        maxPrice: 24999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
    {
        _id: "tour_003",
        slug: "kerala-backwaters-retreat",
        title: "Kerala Backwaters Retreat",
        subtitle: "Houseboats, lush greenery, and peaceful waterways",
        minDuration: "3 Days",
        maxDuration: "5 Days",
        packageCount: 5,
        minPrice: 10999,
        maxPrice: 19999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
    {
        _id: "tour_004",
        slug: "goa-coastal-vibes",
        title: "Goa Coastal Vibes",
        subtitle: "Beaches, nightlife, and laid-back coastal charm Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim nemo sit omnis facere modi, cupiditate temporibus aliquid? Saepe, minima vero laboriosam, dolorem consequatur temporibus quia est laudantium nesciunt cumque perspiciatis repellendus molestiae quisquam qui at? Officia recusandae est similique praesentium rerum. Voluptate officia doloremque, odio neque aperiam eligendi rerum dicta!",
        minDuration: "2 Days",
        maxDuration: "4 Days",
        packageCount: 6,
        minPrice: 8999,
        maxPrice: 17999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
    {
        _id: "tour_005",
        slug: "kashmir-paradise-on-earth",
        title: "Kashmir: Paradise on Earth",
        subtitle: "Alpine lakes, snow valleys, and breathtaking landscapes",
        minDuration: "4 Days",
        maxDuration: "6 Days",
        packageCount: 2,
        minPrice: 16999,
        maxPrice: 31999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
    {
        _id: "tour_006",
        slug: "varanasi-spiritual-journey",
        title: "Varanasi Spiritual Journey",
        subtitle: "Ancient ghats, sacred rituals, and cultural heritage",
        minDuration: "2 Days",
        maxDuration: "3 Days",
        packageCount: 3,
        minPrice: 6999,
        maxPrice: 12999,
        image: "https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
    },
];