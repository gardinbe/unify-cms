import config from '~/config';
import type { Handler } from '~/lib/types';

const get: Handler = (_req, res) => {
	res.sendFile(`${config.ROOT_DIR}/app/frontend/dist/index.html`);
};

export const vueAppController = { get };
