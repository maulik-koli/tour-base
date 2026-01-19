
export const ADMIN_SORT_VALUE = [
    "createdAt_desc",
    "createdAt_asc",
    "updatedAt_desc",
    "updatedAt_asc",
] as const;

type AdminSortField = typeof ADMIN_SORT_VALUE[number];

export const ADMIN_SORT_FIELD_MAP: Record<AdminSortField, any> = {
    createdAt_desc: { createdAt: -1 },
    createdAt_asc: { createdAt: 1 },
    updatedAt_desc: { updatedAt: -1 },
    updatedAt_asc: { updatedAt: 1 },
}


export const SORT_VALUE = [
    "name_asc",
    "price_asc",
    "price_desc",
    "duration_asc",
    "duration_desc"
] as const;
export type SortField = typeof SORT_VALUE[number];

export const SORT_FIELD_MAP: Record<SortField, any> = {
    name_asc: { name: 1 },
    price_asc: { minPrice: 1 },
    price_desc: { maxPrice: -1 },
    duration_asc: { minDays: 1 },
    duration_desc: { maxDays: -1 },
}


export const DURATION_VALUE = [
    "1-3", "4-7", "8-14", "15+", "none"
] as const;
export type DurationType = typeof DURATION_VALUE[number];

export const DURATION_MAP: Record<DurationType, any> = {
    "1-3": { $gte: 1, $lte: 3 },
    "4-7": { $gte: 4, $lte: 7 },
    "8-14": { $gte: 8, $lte: 14 },
    "15+": { $gte: 15 },
    "none": {},
};