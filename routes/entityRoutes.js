import { Router } from 'express';
import { createEntity,getAllEntities,getEntityById,updateEntity,deleteEntity } from '../controllers/entityController.js';

const entityRoutes = Router();

//Creer
entityRoutes.post('/', createEntity);
//recuperer tous
entityRoutes.get('/', getAllEntities);
//recuper un entité par un ID
entityRoutes.get('/:id', getEntityById);
//modifier un entité
entityRoutes.put('/:id', updateEntity);
//supprimer un entité
entityRoutes.delete('/:id', deleteEntity);

export default entityRoutes;