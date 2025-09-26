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
exports.addUserType = addUserType;
exports.getUserTypes = getUserTypes;
exports.getUserTypeById = getUserTypeById;
exports.updateUserTypeById = updateUserTypeById;
exports.deleteUserTypeById = deleteUserTypeById;
const user_types_joi_1 = require("../../joi/nomenclators/user-types.joi");
const user_types_models_1 = __importDefault(require("../../models/nomenclators/user-types.models"));
// Add new User Type
function addUserType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = user_types_joi_1.JUserType.validate(req.body);
            if (error) {
                return res.status(422).json({ message: 'Validation error', details: error.details });
            }
            const userTypes = yield user_types_models_1.default.create(value);
            return res.status(201).json({ message: 'User Type created successfully', data: userTypes });
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
function getUserTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userTypes = yield user_types_models_1.default.find().lean();
            if (!userTypes || userTypes.length === 0) {
                return res.status(404).json({ message: 'User Types not found', data: userTypes });
            }
            return res.status(200).json({ message: 'User Types retrieved successfully', data: userTypes, count: userTypes.length });
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
function getUserTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userTypeId } = req.params;
        try {
            const userType = yield user_types_models_1.default.findById(userTypeId).lean();
            if (!userType) {
                return res.status(404).json({ message: 'User Type ID not found' });
            }
            return res.status(200).json({ message: 'User Type retrieved successfully', data: userType });
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
function updateUserTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userTypeId } = req.params;
        try {
            const { error, value } = user_types_joi_1.JUpdateUserType.validate(req.body);
            if (error) {
                return res.status(422).json({ message: 'Validation error', details: error.details });
            }
            const userType = yield user_types_models_1.default.findByIdAndUpdate(userTypeId, value, { new: true });
            if (!userType) {
                return res.status(404).json({ message: 'User Type ID not found' });
            }
            return res.status(200).json({ message: 'User type updated successfully', data: userType });
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
function deleteUserTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userTypeId } = req.params;
        try {
            const userType = yield user_types_models_1.default.findByIdAndDelete(userTypeId);
            if (!userType) {
                return res.status(404).json({ message: 'User Type ID not found' });
            }
            return res.status(200).json({ message: 'User Type deleted successfully', data: userType, timestamp: new Date().toISOString });
        }
        catch (err) {
            if (err instanceof Error) {
                const errorDetails = 'details' in err ? err.details : err.message;
                return res.status(500).json({ message: 'Internal server error', details: errorDetails });
            }
        }
    });
}
