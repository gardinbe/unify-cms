import { configDotenv } from 'dotenv';
import { resolve } from 'path';
import { env } from 'process';

import { parseEnv } from '~shared/utils';

configDotenv({ path: resolve(import.meta.dirname, '../.env') });

const IS_PROD = env.NODE_ENV === 'production';

const IS_EXTERNAL_BUILD = parseEnv.bool(env.IS_EXTERNAL_BUILD)
	?? false;

const PORT = parseEnv.int(env.PORT)
	?? 1234;

const COOKIE_SECRET = env.COOKIE_SECRET
	|| 'secret';

const ROOT_PATH = resolve(import.meta.dirname);

const LOGS_PATH = env.LOGS_PATH
	? resolve(env.LOGS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(ROOT_PATH, 'logs')
		: resolve(ROOT_PATH, '../logs');

const UI_ASSETS_PATH = IS_EXTERNAL_BUILD
	? resolve(ROOT_PATH, 'ui')
	: resolve(ROOT_PATH, '../../ui/dist');

const SCHEMAS_PATH = env.SCHEMAS_PATH
	? resolve(env.SCHEMAS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(ROOT_PATH, 'data/schemas')
		: resolve(ROOT_PATH, '../.tmp/schemas');

const DATABASE_PATH = env.DATABASE_PATH
	? resolve(env.DATABASE_PATH)
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
