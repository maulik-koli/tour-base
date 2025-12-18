import { Document, model, Schema, Types } from "mongoose";
import { slugify } from "./tour.utils";

export interface IDayDetail {
    title: string;
    subtitle: string | null;
    description: string;
}

interface DayDetailsDocument extends IDayDetail, Document {
    _id: Types.ObjectId;
}

export interface ITour {
    name: string;
    slug: string;
    tagLine: string;
    description: string; // html string of whole tour
    includes: string[];
    excludes: string[];
    categories: Types.ObjectId[];

    dayPlans: IDayDetail[]; // all day plans
    isActive: boolean;

    images: string[];
    thumbnailImage: string;
    youtubeVideoUrl?: string;
}

export interface TourDocument extends ITour, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface TourLean extends ITour {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type TourFields = keyof TourLean;


const dayDetailsSchema = new Schema<DayDetailsDocument>({
    title: { type: String, required: true },
    subtitle: { type: String, default: null },
    description: { type: String, default: null },
}, { 
    _id: false, 
    versionKey: false 
});


const tourSchema = new Schema<TourDocument>({
    name: { type: String, required: true },
    tagLine: { type: String, required: true },
    description: { type: String, required: true },
    includes: { type: [String], required: true },
    excludes: { type: [String], required: true },
    categories: { type: [Schema.Types.ObjectId], ref: 'Category', default: [] },

    slug: { type: String, required: true, unique: true },

    dayPlans: { type: [dayDetailsSchema], required: true },
    isActive: { type: Boolean, required: true },

    images: { type: [String], required: true },
    thumbnailImage: { type: String, required: true },
    youtubeVideoUrl: { type: String, default: null },
}, {
    timestamps: true,
    versionKey: false
})


tourSchema.pre("save", function (this) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name);
    }
});


tourSchema.pre("findOneAndUpdate", function (this) {
    const update = this.getUpdate()
    if (!update || Array.isArray(update)) return;

    const name = update.name ?? update.$set?.name;
    if (!name) return;

    const newSlug = slugify(name);
    if (update.$set) {
        update.$set.slug = newSlug;
    } else {
        update.slug = newSlug;
    }

    this.setUpdate(update);
})


tourSchema.index({ slug: 1 });

const Tour = model<TourDocument>("Tour", tourSchema);

export default Tour;