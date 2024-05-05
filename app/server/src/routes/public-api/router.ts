import { Router } from 'express';

import { publicCollectionsController } from '~/routes/public-api/collections';
import { publicSinglesController } from '~/routes/public-api/singles';

export const publicApiRouter = Router();

publicApiRouter.get(['/single/:name', '/s/:name', '/:name'], publicSinglesController.get);

publicApiRouter.get(['/collection/:name', '/c/:name'], publicCollectionsController.get);
publicApiRouter.get(['/collection/:name/:id', '/c/:name/:id'], publicCollectionsController.getItem);
