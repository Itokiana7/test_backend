import { Router } from 'express';
import { createUserEntity,getAllUserEntities,getUserEntityById,updateUserEntity,deleteUserEntity } from '../controllers/userEntityController.js';

const userEntityRoutes = Router();

//creer
userEntityRoutes.post('/', createUserEntity);
//recuperer
userEntityRoutes.get('/', getAllUserEntities);
//recuperer avec ID
userEntityRoutes.get('/:id', getUserEntityById);
//UPDATE
userEntityRoutes.put('/:id', updateUserEntity);
//DELETE
userEntityRoutes.delete('/:id', deleteUserEntity);

export default userEntityRoutes;