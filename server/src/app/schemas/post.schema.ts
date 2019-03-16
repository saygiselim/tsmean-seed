import { Schema, model, Document } from 'mongoose';

export interface PostModel extends Document {
    title: string;
    content: string;
    userId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

postSchema.pre('findByIdAndUpdate', next => {
    this.updatedAt = new Date();

    next();
});

export let PostSchema = model<PostModel>('Post', postSchema);
