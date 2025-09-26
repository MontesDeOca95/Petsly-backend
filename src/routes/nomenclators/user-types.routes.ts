import { Router } from 'express';

import {
    addUserType,
    getUserTypes,
    getUserTypeById,
    updateUserTypeById,
    deleteUserTypeById,
} from '../../controllers/nomenclators/user-types.controllers';


const routes = Router();

// CRUD Users
routes.route('/users').get(getUserTypes);
routes.route('/users/:userId').get(getUserTypeById);
routes.route('/users').post(addUserType);
routes.route('/users/:usersId').patch(updateUserTypeById);
routes.route('/users/:usersId').delete(deleteUserTypeById);

export default routes;
