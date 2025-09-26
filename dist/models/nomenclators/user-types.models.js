"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTypesSchema = void 0;
const mongoose_1 = require("mongoose");
// Model
const getUserTypesSchema = (type = 'document') => new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
}, {
    timestamps: type === 'document',
    versionKey: false,
});
exports.getUserTypesSchema = getUserTypesSchema;
const userTypesModels = (0, mongoose_1.model)('UserType', (0, exports.getUserTypesSchema)());
exports.default = userTypesModels;
