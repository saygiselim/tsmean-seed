import { Schema, model, Document } from 'mongoose';

export interface PostModel extends Document {
    title: string;
    content: string;
    userId: Schema.Types.ObjectId;
    createdAt: number;
    updatedAt: number;
}

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

postSchema.pre('findByIdAndUpdate', function(next) {
    const post = this as PostModel;

    post.updatedAt = Date.now();

    next();
});

export let PostSchema = model<PostModel>('Post', postSchema);
