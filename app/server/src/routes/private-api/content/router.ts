import { Router } from 'express';
import { privateSinglesController } from '~/routes/private-api/content/singles';
import { privateCollectionsController } from '~/routes/private-api/content/collections';

export const privateContentRouter = Router();

privateContentRouter.get('/singles/:name', privateSinglesController.get);
privateContentRouter.post('/singles/:name', privateSinglesController.post);
privateContentRouter.patch('/singles/:name', privateSinglesController.patch);

privateContentRouter.get('/collections/:name', privateCollectionsController.get);
privateContentRouter.get('/collections/:name/:id', privateCollectionsController.getItem);
privateContentRouter.post('/collections/:name', privateCollectionsController.postItem);
privateContentRouter.patch('/collections/:name/:id', privateCollectionsController.patchItem);
privateContentRouter.delete('/collections/:name/:id', privateCollectionsController.deleteItem);
