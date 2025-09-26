"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_status_controllers_1 = require("../../controllers/nomenclators/user-status.controllers");
const routes = (0, express_1.Router)();
// CRUD Users
routes.route('/users').get(user_status_controllers_1.getUserStatuses);
routes.route('/users/:userId').get(user_status_controllers_1.getUserStatusById);
routes.route('/users').post(user_status_controllers_1.addUserStatus);
routes.route('/users/:usersId').patch(user_status_controllers_1.updateUserStatusById);
routes.route('/users/:usersId').delete(user_status_controllers_1.deleteUserStatusById);
exports.default = routes;
