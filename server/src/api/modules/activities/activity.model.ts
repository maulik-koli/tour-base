import { Document, model, Schema, Types } from "mongoose";
import { slugify } from "@/api/core/helper/data.helper";


export interface IActivity {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    city: string;
    pricePerPerson: number;
    thumbnailImage: string;
    images: string[];
    extraNote: string;
    isActive: boolean;
}

export interface ActivityDocument extends IActivity, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ActivityLean extends IActivity {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type ActivityFields = keyof ActivityLean;


const activitySchema = new Schema<ActivityDocument>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    pricePerPerson: { type: Number, required: true },
    thumbnailImage: { type: String, required: true },
    images: { type: [String], default: [] },
    extraNote: { type: String },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false
});


activitySchema.pre("save", function (this) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title);
    }
});


activitySchema.pre("findOneAndUpdate", function (this) {
    const update = this.getUpdate();
    if (!update || Array.isArray(update)) return;

    const title = update.title ?? update.$set?.title;

    if (title) {
        this.set({ slug: slugify(title) });
    }
});


activitySchema.index({ title: 1 });
activitySchema.index({ city: 1 });

const Activity = model<ActivityDocument>("Activity", activitySchema);

export default Activity;
