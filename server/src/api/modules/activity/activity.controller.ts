import { ActivityListQueries, ActivityPayload } from "./activity.schema";
import { 
    activityAdminService,
    activityService,
} from "./activity.service";

import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { successResponse } from "@/api/utils/response";


class ActivityAdminController {
    public createActivity = asyncWrapper(async (req, res) => {
        const payload = req.body as ActivityPayload;

        await activityAdminService.createActivity(payload);

        successResponse(res, {
            message: "Activity created successfully",
            status: 201,
            data: null,
        });
    });

    public getActivitiesList = asyncWrapper(async (req, res) => {
        const query = req.localsQuery as ActivityListQueries;

        const { activities, pagination } = await activityService.getActivitiesList(query);

        successResponse(res, {
            message: "Activities list fetched successfully",
            status: 200,
            data: { activities, pagination },
        });
    });

    public getActivity = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        const activity = await activityService.findActivity({ slug });

        successResponse(res, {
            message: "Activity fetched successfully",
            status: 200,
            data: activity,
        });
    });

    public updateActivity = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;
        const payload = req.body as ActivityPayload;

        const activity = await activityAdminService.updateActivity(slug, payload);

        successResponse(res, {
            message: "Activity updated successfully",
            status: 200,
            data: activity,
        });
    });

    public deleteActivity = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        await activityAdminService.deleteActivity(slug);

        successResponse(res, {
            message: "Activity deleted successfully",
            status: 200,
            data: null,
        });
    });
}

const activityAdminController = new ActivityAdminController();



class ActivityController {
     public getActivitiesList = asyncWrapper(async (req, res) => {
        const query = req.localsQuery as ActivityListQueries;
        const { activities, pagination } = await activityService.getActivitiesList(query, {
            isActive: true,
        });

        successResponse(res, {
            message: "Activities list fetched successfully",
            status: 200,
            data: { activities, pagination },
        });
    });
    
    public getActivity = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        const activity = await activityService.findActivity({ 
            slug,
            isActive: true,
        });

        successResponse(res, {
            message: "Activity fetched successfully",
            status: 200,
            data: activity,
        });
    });
}

const activityController = new ActivityController();



export { activityAdminController, activityController }