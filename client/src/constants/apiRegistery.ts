
export const QUERY_REGISTRY = {
    getTours: 'get-tours',
    getTour: 'get-tour',
    getFeaturedTours: 'get-featured-tours',

    getCategoryOptions: 'get-category-options',
    getCategories: 'get-categories',
    
    getBookingData: "get-booking-data",

    getActivities: 'get-activities',
    getActivityDetails: 'get-activity-details',
} as const;


export const MUTATION_REGISTRY = {
    createBooking: 'create-booking',
    customerBooking: 'customer-booking',
    bookingPayment: 'booking-payment',
} as const;