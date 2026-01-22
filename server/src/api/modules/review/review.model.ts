import { model, Schema, Types, Document } from "mongoose";

export interface IReview {
    tourId: Types.ObjectId;
    reviewerName: string;
    rating: number;
    comment: string;
    imageUrl: string | null;
}

interface ReviewDocument extends IReview, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewLean extends IReview {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const reviewSchema = new Schema<ReviewDocument>({
    tourId: { type: Types.ObjectId, required: true, ref: 'Tour' },
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    imageUrl: { type: String, default: null },
}, {
    versionKey: false,
    timestamps: true,
});

reviewSchema.index({ tourId: 1 });

const Review = model<ReviewDocument>('Review', reviewSchema);

export default Review;