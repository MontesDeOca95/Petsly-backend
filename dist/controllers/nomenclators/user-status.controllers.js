"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserStatus = addUserStatus;
exports.getUserStatuses = getUserStatuses;
exports.getUserStatusById = getUserStatusById;
exports.updateUserStatusById = updateUserStatusById;
exports.deleteUserStatusById = deleteUserStatusById;
const user_statuses_joi_1 = require("../../joi/nomenclators/user-statuses.joi");
const user_statuses_models_1 = __importDefault(require("../../models/nomenclators/user-statuses.models"));
// Add new User Status
function addUserStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = user_statuses_joi_1.JUserStatus.validate(req.body);
            if (error) {
                return res.status(422).json({ message: 'Validation error', details: error.details });
            }
            const userStatus = yield user_statuses_models_1.default.create(value);
            return res.status(201).json({ message: 'User Status created successfully', data: userStatus });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
;
// Show all user types
function getUserStatuses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userStatuses = yield user_statuses_models_1.default.find().lean();
            if (!userStatuses || userStatuses.length === 0) {
                return res.status(404).json({ message: 'User Status not found', data: userStatuses });
            }
            return res.status(200).json({ message: 'User Status retrieved successfully', data: userStatuses, count: userStatuses.length });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
;
// Show user type by ID
function getUserStatusById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userStatusId } = req.params;
        try {
            const userStatus = yield user_statuses_models_1.default.findById(userStatusId).lean();
            if (!userStatus) {
                return res.status(404).json({ message: 'User Status ID not found' });
            }
            return res.status(200).json({ message: 'User Status retrieved successfully', data: userStatus });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
;
// Partial update user Type by ID
function updateUserStatusById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userStatusId } = req.params;
        try {
            const { error, value } = user_statuses_joi_1.JUpdateUserStatus.validate(req.body);
            if (error) {
                return res.status(422).json({ message: 'Validation error', details: error.details });
            }
            const userStatus = yield user_statuses_models_1.default.findByIdAndUpdate(userStatusId, value, { new: true });
            if (!userStatus) {
                return res.status(404).json({ message: 'User Status ID not found' });
            }
            return res.status(200).json({ message: 'User Status updated successfully', data: userStatus });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
;
// Delete user Type by ID
function deleteUserStatusById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userStatusId } = req.params;
        try {
            const userStatus = yield user_statuses_models_1.default.findByIdAndDelete(userStatusId);
            if (!userStatus) {
                return res.status(404).json({ message: 'User Status ID not found' });
            }
            return res.status(200).json({ message: 'User Status deleted successfully', data: userStatus, timestamp: new Date().toISOString });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
