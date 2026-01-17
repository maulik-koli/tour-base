import { ActivityPayload } from "./activity.schema";
import { 
    createActivity, 
    deleteActivity, 
    findActivity, 
    getActivitiesList, 
    updateActivity 
} from "./activity.service";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";


export const createActivityController = asyncWrapper(async (req, res) => {
    const payload = req.body as ActivityPayload;

    const activity = await createActivity(payload);

    successResponse(res, {
        message: "Activity created successfully",
        status: 201,
        data: activity,
    });
});


export const getActivityController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    const activity = await findActivity({ slug });

    successResponse(res, {
        message: "Activity fetched successfully",
        status: 200,
        data: activity,
    });
});


export const updateActivityController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;
    const payload = req.body as ActivityPayload;

    const activity = await updateActivity(slug, payload);

    successResponse(res, {
        message: "Activity updated successfully",
        status: 200,
        data: activity,
    });
});


export const deleteActivityController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    await deleteActivity(slug);

    successResponse(res, {
        message: "Activity deleted successfully",
        status: 200,
        data: null,
    });
});


export const getActivitiesListController = asyncWrapper(async (req, res) => {
    const activities = await getActivitiesList();

    successResponse(res, {
        message: "Activities list fetched successfully",
        status: 200,
        data: activities,
    });
});
