
export const SortingOptions = [
    { label: 'Recently Created', value: 'createdAt_desc' },
    { label: 'Recently Updated', value: 'updatedAt_desc' },
    { label: 'Least Updated', value: 'updatedAt_asc' },
    { label: 'Oldest Added', value: 'createdAt_asc' },
];

export const BookingStatusOptions: { label: string, value: string }[]= [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Details Filled', value: 'DETAILS_FILLED' },
    { label: 'Paid', value: 'PAID_FULL' },
    { label: 'Partially Paid', value: 'PAID_PARTIAL' },
    { label: 'Failed', value: 'FAILED' },
    { label: 'None', value: 'NONE' },
];

export const TourStarHirarchyOptions = [
    { label: '5 Star', value: "5" },
    { label: '4 Star', value: "4" },
    { label: '3 Star', value: "3" },
    { label: '2 Star', value: "2" },
    { label: '1 Star', value: "1" },
];