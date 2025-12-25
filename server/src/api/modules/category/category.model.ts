import { Types, Document, Schema, model } from "mongoose";

export interface ICategory {
    name: string;
    value: string;
    subtitle: string;
    image: string;
    order: number;
}

export interface CategoryDocument extends ICategory, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryLean extends ICategory {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },
    value: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

categorySchema.index({ order: 1 });

const Category = model<CategoryDocument>('Category', categorySchema);

export default Category;