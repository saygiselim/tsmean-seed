import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    createdAt: Date
});

userSchema.pre('save', next => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
});

export default model('User', userSchema);
