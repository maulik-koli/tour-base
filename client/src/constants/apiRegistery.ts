
export const QUERY_REGISTRY = {
    getTours: 'get-tours',
    getTour: 'get-tour',
    getFeaturedTours: 'get-featured-tours',

    getCategoryOptions: 'get-category-options',
    getCategories: 'get-categories',
    
    getBookingData: "get-booking-data",

    getActivities: 'get-activities',
    getActivityDetails: 'get-activity-details',

    getRequestSession: 'get-request-session',
} as const;


export const MUTATION_REGISTRY = {
    createBooking: 'create-booking',
    customerBooking: 'customer-booking',
    bookingPayment: 'booking-payment',

    generateOtp: 'generate-otp',
    verifyOtp: 'verify-otp',
} as const;