"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStatusesSchema = void 0;
const mongoose_1 = require("mongoose");
// Model
const getUserStatusesSchema = (type = 'document') => new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
}, {
    timestamps: type === 'document',
    versionKey: false,
});
exports.getUserStatusesSchema = getUserStatusesSchema;
const userStatusesModels = (0, mongoose_1.model)('UserStatuses', (0, exports.getUserStatusesSchema)());
exports.default = userStatusesModels;
