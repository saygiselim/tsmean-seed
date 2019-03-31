import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { environment } from '@environment';

export interface UserModel extends Document {
    email: string;
    name: string;
    password: string;
    createdAt?: number;
    updatedAt?: number;

    verifyPassword(password: string): Promise<boolean>;
    generateJWT(): string;
}

const userSchema: Schema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    const user = this as UserModel;

    bcrypt.genSalt(10, (errSalt, salt) => {
        bcrypt.hash(user.password, salt, (errHash, hash) => {
            user.password = hash;
            next();
        });
    });
});

userSchema.pre('findByIdAndUpdate', function(next) {
    const user = this as UserModel;

    user.updatedAt = Date.now();

    next();
});

userSchema.methods.verifyPassword = function(password: string): Promise<boolean> {
    const user = this as UserModel;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, verified) => {
            if (err) {
                reject(err);
            } else {
                resolve(verified);
            }
        });
    });
};

userSchema.methods.generateJWT = function() {
    const user = this as UserModel;

    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
    }, environment.tokenSecret, { expiresIn: '1h' });
};

export let UserSchema = model<UserModel>('User', userSchema);
