import { Router } from 'express';
import { internalSinglesController } from '~/routes/internal-api/content/singles';
import { internalCollectionsController } from '~/routes/internal-api/content/collections';

export const internalContentRouter = Router();

internalContentRouter.get('/singles/:name', internalSinglesController.get);
internalContentRouter.post('/singles/:name', internalSinglesController.post);
internalContentRouter.patch('/singles/:name', internalSinglesController.patch);

internalContentRouter.get('/collections/:name', internalCollectionsController.get);
internalContentRouter.get('/collections/:name/:id', internalCollectionsController.getItem);
internalContentRouter.post('/collections/:name', internalCollectionsController.postItem);
internalContentRouter.patch('/collections/:name/:id', internalCollectionsController.patchItem);
internalContentRouter.delete('/collections/:name/:id', internalCollectionsController.deleteItem);
