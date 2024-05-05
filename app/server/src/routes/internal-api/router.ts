import { Router } from 'express';

import { internalContentRouter } from '~/routes/internal-api/content/router';
import { internalSchemasRouter } from '~/routes/internal-api/schemas/router';

export const internalApiRouter = Router();

internalApiRouter.use('/schemas', internalSchemasRouter);
internalApiRouter.use('/content', internalContentRouter);
