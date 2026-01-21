import { PackageCategory } from "@module/packages/api/types";

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

export const PackageCategoryOptions = [
    { label: 'Diamond 5*', value: PackageCategory.DIAMOND },
    { label: 'Premium 4*', value: PackageCategory.PREMIUM },
    { label: 'Deluxe 3*', value: PackageCategory.DELUXE },
    { label: 'Budget 2*', value: PackageCategory.BUDGET },
];