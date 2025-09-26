"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JUpdateUserStatus = exports.JUserStatus = void 0;
const joi_1 = __importDefault(require("joi"));
exports.JUserStatus = joi_1.default.object({
    _id: joi_1.default.string(),
    name: joi_1.default.string().required(),
    code: joi_1.default.string().required(),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date()
})
    .options({ abortEarly: false })
    .allow(null);
exports.JUpdateUserStatus = joi_1.default.object({
    _id: joi_1.default.string(),
    name: joi_1.default.string(),
    code: joi_1.default.string(),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date()
})
    .options({ abortEarly: false })
    .allow(null);
