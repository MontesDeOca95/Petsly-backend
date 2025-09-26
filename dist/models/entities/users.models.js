"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersSchema = void 0;
const mongoose_1 = require("mongoose");
const user_types_models_1 = require("../nomenclators/user-types.models");
const user_statuses_models_1 = require("../nomenclators/user-statuses.models");
// Model
const getUsersSchema = (type = "document") => {
    let schema = {
        firstName: { type: String },
        lastName: { type: String },
        dni: { type: String },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        userType: { type: (0, user_types_models_1.getUserTypesSchema)('subdocument'), required: true },
        status: { type: (0, user_statuses_models_1.getUserStatusesSchema)('subdocument'), required: true },
    };
    return new mongoose_1.Schema(schema, {
        timestamps: type === 'document',
        versionKey: false,
    });
};
exports.getUsersSchema = getUsersSchema;
const usersModels = (0, mongoose_1.model)('User', (0, exports.getUsersSchema)());
exports.default = usersModels;
