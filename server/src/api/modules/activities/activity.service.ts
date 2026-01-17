import Activity, { ActivityFields, ActivityLean } from "./activity.model";
import { ActivityPayload } from "./activity.schema";
import { slugify } from "./activity.utils";

import { CustomError } from "@/api/utils/response";


export const createActivity = async (payload: ActivityPayload) => {
    const slug = slugify(payload.title);

    const existingActivity = await Activity.exists({ slug });

    if (existingActivity) {
        throw new CustomError(409, "Activity with this title already exists");
    }

    const activity = new Activity({ ...payload, slug });
    const newActivity = await activity.save();

    return newActivity.toObject();
};


export const findActivity = async (query: Partial<ActivityLean>, select?: ActivityFields[]) => {
    const activity = await Activity.findOne(query)
        .select(select?.join(' ') || '')
        .lean();

    if (!activity) {
        throw new CustomError(404, 'Activity not found');
    }

    return activity;
};


export const updateActivity = async (slug: string, payload: ActivityPayload) => {
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


export const deleteActivity = async (slug: string) => {
    const activity = await Activity.findOneAndDelete({ slug }).lean();

    if (!activity) {
        throw new CustomError(404, 'Activity not found');
    }

    return activity;
};


export const getActivitiesList = async () => {
    const activities = await Activity.find()
        .select('title slug subtitle city pricePerPerson thumbnailImage isActive createdAt')
        .sort({ createdAt: -1 })
        .lean();

    return activities;
};
