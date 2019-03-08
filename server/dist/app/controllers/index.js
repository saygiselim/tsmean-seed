"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const controllersRouter = express_1.Router();
// controllers
controllersRouter.use('/users', user_controller_1.default);
exports.default = controllersRouter;
//# sourceMappingURL=index.js.map