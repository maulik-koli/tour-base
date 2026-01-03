
export const QUERY_REGISTRY = {
    getTours: 'get-tours',
    getTour: 'get-tour',
    getCategoryOptions: 'get-category-options',
    getFeaturedTours: 'get-featured-tours',
    getCategories: 'get-categories',
    getBookingData: "get-booking-data",
} as const;


export const MUTATION_REGISTRY = {
    createBooking: 'create-booking',
    customerBooking: 'customer-booking',
} as const;