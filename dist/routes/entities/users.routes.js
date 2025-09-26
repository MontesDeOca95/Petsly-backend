"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../../controllers/entities/users.controller");
const routes = (0, express_1.Router)();
// CRUD Users
routes.route('/users').get(users_controller_1.getUsers);
routes.route('/users/:userId').get(users_controller_1.getUserById);
routes.route('/users').post(users_controller_1.addUser);
routes.route('/users/:usersId').patch(users_controller_1.updateUserById);
routes.route('/users/:usersId').delete(users_controller_1.deleteUserById);
exports.default = routes;
