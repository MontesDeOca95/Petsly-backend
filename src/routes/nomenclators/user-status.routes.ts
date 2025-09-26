import { Router } from 'express';

import {
    addUserStatus,
    getUserStatuses,
    getUserStatusById,
    updateUserStatusById,
    deleteUserStatusById,
} from '../../controllers/nomenclators/user-status.controllers';


const routes = Router();

// CRUD Users
routes.route('/users').get(getUserStatuses);
routes.route('/users/:userId').get(getUserStatusById);
routes.route('/users').post(addUserStatus);
routes.route('/users/:usersId').patch(updateUserStatusById);
routes.route('/users/:usersId').delete(deleteUserStatusById);

export default routes;