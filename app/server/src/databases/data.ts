import { Sequelize } from 'sequelize';

import config from '~/config';
import { log } from '~/lib/utils';

export const data = new Sequelize({
	dialect: 'sqlite',
	storage: config.DATABASE_PATH,
	logging: config.IS_PROD
		? (message) => void log(message, { file: 'database', toConsole: false })
		: false
});
