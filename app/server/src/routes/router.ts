import { Router } from 'express';

import { internalApiRouter } from '~/routes/internal-api/router';
import { pagesRouter } from '~/routes/pages/router';
import { publicApiRouter } from '~/routes/public-api/router';

export const router = Router();

router.use('/api', publicApiRouter);
router.use('/internal-api', internalApiRouter);
router.use(pagesRouter);
