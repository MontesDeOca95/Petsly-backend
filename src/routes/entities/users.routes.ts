import { Router } from 'express';

import {
    addUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from '../../controllers/entities/users.controller'


const routes = Router();

// CRUD Users
routes.route('/users').get(getUsers);
routes.route('/users/:userId').get(getUserById);
routes.route('/users').post(addUser);
routes.route('/users/:usersId').patch(updateUserById);
routes.route('/users/:usersId').delete(deleteUserById);

export default routes;
