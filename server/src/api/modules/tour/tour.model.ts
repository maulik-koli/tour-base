import { Document, model, Schema, Types } from "mongoose";
import { embededYoutubeUrl, slugify } from "./tour.utils";

export interface IDayDetail {
    title: string;
    subtitle: string | null;
    description: string;
}

interface DayDetailsDocument extends IDayDetail, Document {}

export interface ITour {
    slug: string;
    name: string;
    tagLine: string;
    
    description: string;
    includes: string[];
    excludes: string[];
    categories: Types.ObjectId[];

    dayPlans: IDayDetail[]; // all day plans
    isActive: boolean;

    images: string[];
    galleryImages: string[];
    thumbnailImage: string;
    youtubeVideoUrl: string | null;

    isFeatured: boolean;
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
    description: { type: String, required: true },
}, { 
    _id: false, 
    versionKey: false 
});


const tourSchema = new Schema<TourDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    tagLine: { type: String, required: true },

    description: { type: String, required: true },
    includes: { type: [String], required: true },
    excludes: { type: [String], required: true },
    categories: { type: [String], ref: 'Category', default: [] },

    dayPlans: { type: [dayDetailsSchema], required: true },
    isActive: { type: Boolean, required: true },

    images: { type: [String], default: [] },
    galleryImages: { type: [String], default: [] },
    thumbnailImage: { type: String, required: true },
    youtubeVideoUrl: { type: String, default: null },

    isFeatured: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
})


tourSchema.pre("save", function (this) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name);
    }
    if (this.isModified("youtubeVideoUrl")) {
        this.youtubeVideoUrl = embededYoutubeUrl(this.youtubeVideoUrl);
    }
});


tourSchema.pre("findOneAndUpdate", function (this) {
    const update = this.getUpdate()
    if (!update || Array.isArray(update)) return;

    const name = update.name ?? update.$set?.name;
    const youtubeVideoUrl = update.youtubeVideoUrl ?? update.$set?.youtubeVideoUrl;

    if (name) {
        const newSlug = slugify(name);
        if (update.$set) {
            update.$set.slug = newSlug;
        } else {
            update.slug = newSlug;
        }
    }
    if (youtubeVideoUrl) {
        const newYoutubeUrl = embededYoutubeUrl(youtubeVideoUrl);
        if (update.$set) {
            update.$set.youtubeVideoUrl = newYoutubeUrl;
        } else {
            update.youtubeVideoUrl = newYoutubeUrl;
        }
    }


    this.setUpdate(update);
})


tourSchema.index({ slug: 1 }, { unique: true });

const Tour = model<TourDocument>("Tour", tourSchema);

export default Tour;