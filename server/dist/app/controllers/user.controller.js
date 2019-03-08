"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const router = express_1.Router();
router.get('/', async (req, res) => {
    const users = await user_schema_1.default.find().then();
    res.send(users);
});
router.post('/', (req, res) => {
    const user = new user_schema_1.default(req.body);
    user.save(err => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(user);
    });
});
exports.default = router;
//# sourceMappingURL=user.controller.js.map