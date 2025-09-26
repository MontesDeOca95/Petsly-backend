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
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_joi_1 = require("../../joi/entities/users.joi");
const users_models_1 = __importDefault(require("../../models/entities/users.models"));
// Add a new User
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = users_joi_1.JUser.validate(req.body);
            if (error) {
                throw new Error('Validation error:' + error.message);
            }
            const hashedPassword = yield bcryptjs_1.default.hash(value.password, 10);
            const existingUser = yield users_models_1.default.findOne({ $or: [{ username: value.username }, { email: value.email }] });
            if (existingUser) {
                throw new Error('User already exists with this username or email');
            }
            const user = yield users_models_1.default.create({
                firstName: value.firstName,
                lastName: value.lastName,
                dni: value.dni,
                username: value.username,
                password: hashedPassword,
                email: value.email
            });
            const userResponse = user.toObject();
            // delete userResponse.password; // Remove password from response
            return res.status(201).json({ message: 'User created successfully', data: userResponse });
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
// Show all users
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield users_models_1.default.find().select('-password').lean();
            if (!users || users.length === 0) {
                throw new Error('No users found');
            }
            return res.status(200).json({ message: 'All Users retrieved successfully', data: users, count: users.length });
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
// Show user by ID
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield users_models_1.default.findById(userId).lean();
            if (!user) {
                throw new Error('User not found');
            }
            return res.status(200).json({ message: 'User retrieved successfully', data: user });
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
// Partial update of user data
function updateUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const { error, value } = users_joi_1.JUpdateUser.validate(req.body);
            if (error) {
                throw new Error('Validation Error');
            }
            const user = yield users_models_1.default.findByIdAndUpdate(userId, value, { new: true });
            if (!user) {
                throw new Error('User not Found');
            }
            return res.status(200).json({ message: 'User updated successfully', data: user });
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
// Delete user By ID
function deleteUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield users_models_1.default.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return res.status(200).json({ message: 'User deleted successfully', data: user, timestamp: new Date().toISOString() });
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
