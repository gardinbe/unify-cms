import { Sequelize } from 'sequelize';
import config from '~/config';

export const data = new Sequelize({
	dialect: 'sqlite',
	storage: config.DATABASE_PATH
		?? ':memory:',
	logging: config.IS_PROD
		? console.log
		: false
});
