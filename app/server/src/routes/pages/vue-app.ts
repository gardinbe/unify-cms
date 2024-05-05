import { resolve } from 'path';

import config from '~/config';
import type { Handler } from '~/lib/types';

const get: Handler = (_req, res) => {
	res.sendFile(
		resolve(config.UI_ASSETS_PATH, 'index.html')
	);
};

export const vueAppController = { get };
