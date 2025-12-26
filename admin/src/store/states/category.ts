import { create } from "zustand";
import { CategoryType } from "@module/category/api/types";

type CategoryState = {
    categories: CategoryType[];
    selectedCategory: CategoryType | null;
    setCategories: (categories: CategoryType[]) => void;
    setSelectedCategory: (category: CategoryType | null) => void;
}


export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    selectedCategory: null,

    setCategories: (categories) => set({ categories }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
}))