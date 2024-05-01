import { Router } from 'express';
import { pagesRouter } from '~/routes/pages/router';
import { privateApiRouter } from '~/routes/private-api/router';
import { publicApiRouter } from '~/routes/public-api/router';

export const router = Router();

router.use('/api', publicApiRouter);
router.use('/internal-api', privateApiRouter);
router.use(pagesRouter);
