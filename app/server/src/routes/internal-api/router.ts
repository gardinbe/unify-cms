import { Router } from 'express';
import { internalSchemasRouter } from '~/routes/internal-api/schemas/router';
import { internalContentRouter } from '~/routes/internal-api/content/router';

export const internalApiRouter = Router();

internalApiRouter.use('/schemas', internalSchemasRouter);
internalApiRouter.use('/content', internalContentRouter);
