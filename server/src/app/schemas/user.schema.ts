import { Schema, model, Document } from 'mongoose';

export interface UserModel extends Document {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', next => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
});

userSchema.pre('findByIdAndUpdate', next => {
    this.updatedAt = new Date();

    next();
});

export let UserSchema = model<UserModel>('User', userSchema);
