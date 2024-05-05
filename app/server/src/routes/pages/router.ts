import { Router } from 'express';

import { vueAppController } from '~/routes/pages/vue-app';

export const pagesRouter = Router();

pagesRouter.get('*', vueAppController.get);
