"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.schema.js.map