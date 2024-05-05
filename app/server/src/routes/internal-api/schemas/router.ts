import { Router } from 'express';

import { internalCollectionsSchemaController } from '~/routes/internal-api/schemas/collections';
import { internalSinglesSchemaController } from '~/routes/internal-api/schemas/singles';

export const internalSchemasRouter = Router();

internalSchemasRouter.get('/singles', internalSinglesSchemaController.getAll);
internalSchemasRouter.get('/singles/:name', internalSinglesSchemaController.get);
internalSchemasRouter.post('/singles', internalSinglesSchemaController.post);
internalSchemasRouter.patch('/singles/:name', internalSinglesSchemaController.patch);
internalSchemasRouter.delete('/singles/:name', internalSinglesSchemaController.delete);

internalSchemasRouter.get('/collections', internalCollectionsSchemaController.getAll);
internalSchemasRouter.get('/collections/:name', internalCollectionsSchemaController.get);
internalSchemasRouter.post('/collections', internalCollectionsSchemaController.post);
internalSchemasRouter.patch('/collections/:name', internalCollectionsSchemaController.patch);
internalSchemasRouter.delete('/collections/:name', internalCollectionsSchemaController.delete);
