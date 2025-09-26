"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JUpdateUser = exports.JUser = void 0;
const joi_1 = __importDefault(require("joi"));
const user_types_joi_1 = require("../nomenclators/user-types.joi");
const user_statuses_joi_1 = require("../nomenclators/user-statuses.joi");
exports.JUser = joi_1.default.object({
    _id: joi_1.default.string(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    dni: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    userType: user_types_joi_1.JUpdateUserType,
    status: user_statuses_joi_1.JUpdateUserStatus,
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
})
    .options({ abortEarly: false })
    .allow(null);
exports.JUpdateUser = joi_1.default.object({
    _id: joi_1.default.string(),
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    dni: joi_1.default.string(),
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    email: joi_1.default.string().email(),
    userType: user_types_joi_1.JUpdateUserType,
    status: user_statuses_joi_1.JUpdateUserStatus,
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
})
    .options({ abortEarly: false })
    .allow(null);
