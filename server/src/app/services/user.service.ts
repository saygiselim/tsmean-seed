import { Schema } from 'mongoose';

import { UserModel, UserSchema } from '../schemas/user.schema';

export class UserService {
    async getUsers() {
        return await UserSchema.find().then();
    }

    async createUser(user: UserModel) {
        const userSchema = new UserSchema(user);

        await userSchema.save();

        return userSchema;
    }

    async getUser(id: Schema.Types.ObjectId) {
        return await UserSchema.findById(id).then();
    }

    async getUserByEmail(email: string) {
        return await UserSchema.findOne({ email }).then();
    }

    async updateUser(id: Schema.Types.ObjectId, user: UserModel) {
        return await UserSchema.findByIdAndUpdate(id, user).then();
    }

    async deleteUser(id: Schema.Types.ObjectId) {
        return await UserSchema.findByIdAndDelete(id).then();
    }
}
