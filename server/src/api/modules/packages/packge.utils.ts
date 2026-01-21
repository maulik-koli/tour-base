
export enum PackageCategory {
    BUDGET = 'BUDGET',
    DELUXE = 'DELUXE',
    PREMIUM = 'PREMIUM',
    DIAMOND = 'DIAMOND',
}

export type PackageCategoryType = keyof typeof PackageCategory;

export const PackageCategoryValues = Object.values(PackageCategory);

export const PACKAGE_CATEGORY_PRIORITY: Record<PackageCategory, number> = {
    [PackageCategory.BUDGET]: 2,
    [PackageCategory.DELUXE]: 3,
    [PackageCategory.PREMIUM]: 4,
    [PackageCategory.DIAMOND]: 5,
};