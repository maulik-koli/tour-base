import { asyncWrapper } from "@/api/utils/apiHelper";
import { CategoryPayload } from "./category.schema";
import { createCategory, deleteCategory, findCategory, getCategories, getCategoryOptions, updateCategory } from "./category.service";
import { successResponse } from "@/api/utils/response";;


export const createCategoryController = asyncWrapper(async (req, res) => {
    const payload = req.body as CategoryPayload;

    await createCategory(payload);

    successResponse(res, {
        status: 201,
        message: 'Category created successfully',
        data: null,
    })
})


export const updateCategoryController = asyncWrapper(async (req, res) => {
    const categoryId = req.params.categoryId;
    const payload = req.body as CategoryPayload;

    const category = await findCategory(categoryId);

    const updatedCategory = await updateCategory(category, payload);

    successResponse(res, {
        status: 200,
        message: 'Category updated successfully',
        data: updatedCategory,
    });
});


export const deleteCategoryController = asyncWrapper(async (req, res) => {
    const categoryId = req.params.categoryId;

    const category = await findCategory(categoryId);

    await deleteCategory(categoryId, category.value);

    successResponse(res, {
        message: 'Category deleted successfully',
        status: 200,
        data: null,
    });
});


export const getCategoriesController = asyncWrapper(async (req, res) => {
    const categories = await getCategories();

    successResponse(res, {
        status: 200,
        message: 'Categories fetched successfully',
        data: categories,
    });
});


export const getCategoryOptionsController = asyncWrapper(async (req, res) => {
    const categories = await getCategoryOptions();

    successResponse(res, {
        status: 200,
        message: 'Category options fetched successfully',
        data: categories,
    });
});