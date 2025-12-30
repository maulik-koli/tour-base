
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



export const CATEGORY_OPTIONS = [
    { label: "Adventure", value: "advanture" },
    { label: "Cultural", value: "cultural" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Wildlife", value: "wildlife" },
    { label: "Spiritual", value: "spiritual" },
    { label: "Nature", value: "nature" },
    { label: "Heritage", value: "heritage" },
];

export const CATEGORY_OPTIONS_VALUES = [
    "advanture", "cultural", "relaxation", "wildlife", "spiritual", "nature", "heritage"
] as const;
export type CategoryOptionsType = typeof CATEGORY_OPTIONS_VALUES[number];


export const GENDER_OPTIONS = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },

];

export const GENDER_OPTIONS_VALUES = [
    "M", "F"
] as const;
export type GenderOptionsType = typeof GENDER_OPTIONS_VALUES[number];