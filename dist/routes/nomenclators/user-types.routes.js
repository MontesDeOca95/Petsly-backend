"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_types_controllers_1 = require("../../controllers/nomenclators/user-types.controllers");
const routes = (0, express_1.Router)();
// CRUD Users
routes.route('/users').get(user_types_controllers_1.getUserTypes);
routes.route('/users/:userId').get(user_types_controllers_1.getUserTypeById);
routes.route('/users').post(user_types_controllers_1.addUserType);
routes.route('/users/:usersId').patch(user_types_controllers_1.updateUserTypeById);
routes.route('/users/:usersId').delete(user_types_controllers_1.deleteUserTypeById);
exports.default = routes;
