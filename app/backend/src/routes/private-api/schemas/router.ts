import { Router } from 'express';
import { privateSinglesSchemaController } from '~/routes/private-api/schemas/singles';
import { privateCollectionsSchemaController } from '~/routes/private-api/schemas/collections';

export const privateSchemasRouter = Router();

privateSchemasRouter.get('/singles', privateSinglesSchemaController.getAll);
privateSchemasRouter.get('/singles/:name', privateSinglesSchemaController.get);
privateSchemasRouter.post('/singles', privateSinglesSchemaController.post);
privateSchemasRouter.patch('/singles/:name', privateSinglesSchemaController.patch);
privateSchemasRouter.delete('/singles/:name', privateSinglesSchemaController.delete);

privateSchemasRouter.get('/collections', privateCollectionsSchemaController.getAll);
privateSchemasRouter.get('/collections/:name', privateCollectionsSchemaController.get);
privateSchemasRouter.post('/collections', privateCollectionsSchemaController.post);
privateSchemasRouter.patch('/collections/:name', privateCollectionsSchemaController.patch);
privateSchemasRouter.delete('/collections/:name', privateCollectionsSchemaController.delete);

