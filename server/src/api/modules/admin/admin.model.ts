import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin {
    name: string;
    email: string;
    password: string;
    phone: string;
    token: string | null;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AdminDocument extends IAdmin, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminLean extends IAdmin {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const adminSchema = new Schema<AdminDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    token: { type: String, default: null },
}, {
    timestamps: true,
    versionKey: false,
})


adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});


adminSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};


adminSchema.set('toJSON', {
    transform: function (doc, ret: any) {
        delete ret.password;
        delete ret.token;
        return ret;
    },
});


adminSchema.set('toObject', {
    transform: function (doc, ret: any) {
        delete ret.password;
        delete ret.token;
        return ret;
    },
});


const Admin = mongoose.model<AdminDocument>('Admin', adminSchema);

export default Admin;