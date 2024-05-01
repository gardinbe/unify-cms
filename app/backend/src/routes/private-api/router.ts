import { Router } from 'express';
import { privateSchemasRouter } from '~/routes/private-api/schemas/router';
import { privateContentRouter } from '~/routes/private-api/content/router';

export const privateApiRouter = Router();

privateApiRouter.use('/schemas', privateSchemasRouter);
privateApiRouter.use('/content', privateContentRouter);
