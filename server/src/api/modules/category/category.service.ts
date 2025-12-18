import Tour from "../tour/tour.model";
import Category, { CategoryDocument } from "./category.model";
import { CreateCategoryPayload, UpdateCategoryPayload } from "./category.schema";
import { CustomError } from "@/api/utils/response";


export const createCategory = async (payload: CreateCategoryPayload) => {
    const existingCategory = await Category.exists({ value: payload.value });

    if (existingCategory) {
        throw new CustomError(409, 'Category with this value already exists');
    }

    const lastCategory = await Category.findOne()
        .sort({ order: -1 })
        .select('order')
        .lean();

    const newOrder = lastCategory ? lastCategory.order + 1 : 1;

    const category = new Category({
        ...payload,
        isActive: true,
        order: newOrder,
    });

    await category.save();
}


export const findCategory = async (categoryId: string): Promise<CategoryDocument> => {
    const category = await Category.findById(categoryId);

    if (!category) {
        throw new CustomError(404, 'Category not found');
    }

    return category;
}


export const updateCategory = async (category: CategoryDocument, payload: UpdateCategoryPayload) => {
    Object.assign(category, payload);
    const updatedCategory = await category.save();

    return updatedCategory.toObject();
}


export const deleteCategory = async (categoryId: string) => {
    const tourCounts = await Tour.countDocuments({ categories: categoryId });

    if (tourCounts > 0) {
        throw new CustomError(
            409, 
            `This category is used by ${tourCounts} tour(s). Remove it first from all tours.`
        );
    }

    await Category.findByIdAndDelete(categoryId);
}


export const toggleCategory = async (category: CategoryDocument) => {
    category.isActive = !category.isActive;
    const updatedCategory =  await category.save();
    return updatedCategory.toObject();
}


export const getCategories = async () => {
    const categories = await Category.find()
        .sort({ order: 1 })
        .lean();

    return categories;
}


export const getCategoryOptions = async () => {
    const categories = await Category.find({ isActive: true })
        .sort({ order: 1 })
        .select('name value')
        .lean();

    return categories;
}