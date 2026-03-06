import Activity, { ActivityFields, ActivityLean } from "./activity.model";
import { slugify } from "@/api/core/helper/data.helper";
import { ActivityListQueries, ActivityPayload } from "./activity.schema";

import { CustomError } from "@/api/utils/response";
import { PaginationType } from "@/api/core/types/common.type";


class ActivityAdminService {
    public async createActivity(payload: ActivityPayload){
        const slug = slugify(payload.title);

        const existingActivity = await Activity.exists({ slug });

        if (existingActivity) {
            throw new CustomError(409, "Activity with this title already exists");
        }

        const activity = new Activity({ ...payload, slug });
        const newActivity = await activity.save();

        return newActivity.toObject();
    };

    public async updateActivity(slug: string, payload: ActivityPayload){
        const activity = await Activity.findOneAndUpdate(
            { slug },
            { $set: payload },
            { new: true }
        ).lean();

        if (!activity) {
            throw new CustomError(404, 'Activity not found');
        }

        return activity;
    };

    public async deleteActivity(slug: string){
        const activity = await Activity.findOneAndDelete({ slug }).lean();

        if (!activity) {
            throw new CustomError(404, 'Activity not found');
        }

        return activity;
    };
}

const activityAdminService = new ActivityAdminService();



class ActivityService {
    public async getActivitiesList(query: ActivityListQueries, filterQuery?: Partial<ActivityLean>){
        const { page, limit, search } = query;

        const skip = (page - 1) * limit;

        const filter: any = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } }
            ];
        }

        Object.assign(filter, filterQuery);

        const activities = await Activity.find(filter)
            .select('title slug subtitle city pricePerPerson thumbnailImage isActive updatedAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Activity.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        const pagination: PaginationType = {
            page,
            limit,
            totalPages,
            totalItems: total,
            isNextPage: page < totalPages,
            isPrevPage: page > 1,
        };

        return { activities, pagination };
    };

    public async findActivity(query: Partial<ActivityLean>, select?: ActivityFields[]) {
        const activity = await Activity.findOne(query)
            .select(select?.join(' ') || '')
            .lean();

        if (!activity) {
            throw new CustomError(404, 'Activity not found');
        }

        return activity;
    };
}

const activityService = new ActivityService();



export { activityAdminService, activityService }