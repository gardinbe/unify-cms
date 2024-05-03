import { resolve } from 'path';
import { configDotenv } from 'dotenv';
import { env } from '~shared/utils';

configDotenv({ path: resolve(import.meta.dirname, '../.env') });

const IS_PROD = process.env.NODE_ENV === 'production';

const IS_EXTERNAL_BUILD = env.bool(process.env.IS_EXTERNAL_BUILD)
	?? false;

const PORT = env.int(process.env.PORT)
	?? 1234;

const COOKIE_SECRET = process.env.COOKIE_SECRET
	|| 'secret';

const ROOT_PATH = resolve(import.meta.dirname);

const LOGS_PATH = process.env.LOGS_PATH
	? resolve(process.env.LOGS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(ROOT_PATH, 'logs')
		: resolve(ROOT_PATH, '../logs');

const UI_ASSETS_PATH = IS_EXTERNAL_BUILD
	? resolve(ROOT_PATH, 'ui')
	: resolve(ROOT_PATH, '../../ui/dist');

const SCHEMAS_PATH = process.env.SCHEMAS_PATH
	? resolve(process.env.SCHEMAS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(ROOT_PATH, 'data/schemas')
		: resolve(ROOT_PATH, '../.tmp/schemas');

const DATABASE_PATH = process.env.DATABASE_PATH
	? resolve(process.env.DATABASE_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(ROOT_PATH, 'data/data.db')
		: resolve(ROOT_PATH, '../.tmp/data.db');

export default {
	/** Whether or not the environment variable `NODE_ENV` is set to `production`. */
	IS_PROD,
	/** Whether or not the running instance is an external build. */
	IS_EXTERNAL_BUILD,
	/** Port the HTTP server should run on. */
	PORT,
	/** Secret cookie token. */
	COOKIE_SECRET,
	/** Absolute path of the application's root directory (directory containing top-most `node_modules`). */
	ROOT_PATH,
	/** Absolute path of the application logs directory. */
	LOGS_PATH,
	/** Absolute path of the UI assets directory. */
	UI_ASSETS_PATH,
	/** Absolute path of the `schemas` directory. */
	SCHEMAS_PATH,
	/** Absolute path of the database. */
	DATABASE_PATH
} as const;
