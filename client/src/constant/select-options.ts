
export const SORT_OPTIONS = [
    { label: "Name (A-Z)", value: "name_asc" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Duration: Short to Long", value: "duration_asc" },
    { label: "Duration: Long to Short", value: "duration_desc" },
];

export const SORT_OPTIONS_VALUES = [
    "name_asc", "price_asc", "price_desc", "duration_asc", "duration_desc"
] as const;
export type SortOptionsType = typeof SORT_OPTIONS_VALUES[number];



export const DURATION_OPTIONS = [
    { label: "1-3 Days", value: "1-3" },
    { label: "4-7 Days", value: "4-7" },
    { label: "8-14 Days", value: "8-14" },
    { label: "15+ Days", value: "15+" },
]

export const DURATION_OPTIONS_VALUES = [
    "1-3", "4-7", "8-14", "15+"
] as const;
export type DurationOptionsType = typeof DURATION_OPTIONS_VALUES[number];