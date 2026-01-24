
export const COOKIE_NAME = "__secure-atkn"

export const QUERY_REGISTRY = {
    getProfile: "admin-get-profile",

    getTours : "get-tours",
    getTour : "get-tour",

    getCategoryOptions: "get-category-options",
    getCategories: "get-categories",
    getFeaturedTours: "get-featured-tours",

    getBookingList: "get-booking-list",
    getBookingDetails: "get-booking-details",

    getActivities: "get-activities",
    getActivity: "get-activity",

    getTourReviewList: "get-tour-review-list",
    getTourReviews: "get-tour-reviews",
}


export const MUTATION_REGISTRY = {
    login: 'admin-login',
    logout: 'admin-logout',

    createSignature: "get-media-signature",
    uploadToCloudinary: "upload-to-cloudinary",

    createTour: "create-new-tour",
    updateTour: "update-tour",
    deleteTour: "delete-tour",
    toggleFeaturedTour: "toggle-featured-tour",

    addPackage: "add-package",
    updatePackage: "update-package",
    deletePackage: "delete-package",

    createCategory: "create-category",
    updateCategory: "update-category",
    deleteCategory: "delete-category",

    deleteBooking: "delete-booking",

    createActivity: "create-activity",
    updateActivity: "update-activity",
    deleteActivity: "delete-activity",

    createReview: "create-review",
    updateReview: "update-review",
    deleteReview: "delete-review",
};