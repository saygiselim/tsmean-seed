import { Schema } from 'mongoose';

import { PostModel, PostSchema } from '@schemas/post.schema';

export class PostService {
    async getPosts(userId: Schema.Types.ObjectId) {
        return await PostSchema.find({ userId }).then();
    }

    async createPost(userId: Schema.Types.ObjectId, post: PostModel) {
        const postSchema = new PostSchema(post);

        postSchema.userId = userId;

        await postSchema.save();

        return postSchema;
    }

    async getPost(id: Schema.Types.ObjectId, userId: Schema.Types.ObjectId) {
        return await PostSchema.findOne({ _id: id, userId }).then();
    }

    async updatePost(id: Schema.Types.ObjectId, userId: Schema.Types.ObjectId, post: PostModel) {
        return await PostSchema.findOneAndUpdate({ _id: id, userId }, post).then();
    }

    async deletePost(id: Schema.Types.ObjectId, userId: Schema.Types.ObjectId) {
        return await PostSchema.findOneAndDelete({ _id: id, userId }).then();
    }
}
