import { resolve } from 'path';
import { configDotenv } from 'dotenv';
import root from 'app-root-path';
import { env } from '~shared/utils';

configDotenv({ path: resolve(import.meta.dirname, '../.env') });

const IS_PROD = process.env.NODE_ENV === 'production';

const IS_EXTERNAL_BUILD = env.bool(process.env.IS_EXTERNAL_BUILD)
	?? false;

const PORT = env.int(process.env.PORT)
	?? 3000;

const COOKIE_SECRET = process.env.COOKIE_SECRET
	|| 'secret';

const ROOT_PATH = resolve(root.path);

const LOGS_PATH = process.env.LOGS_PATH
	? resolve(process.env.LOGS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(root.path, 'logs')
		: resolve(root.path, 'app/server/logs');

const UI_ASSETS_PATH = IS_EXTERNAL_BUILD
	? resolve(root.path, 'ui')
	: resolve(root.path, 'app/ui/dist');

const SCHEMAS_PATH = process.env.SCHEMAS_PATH
	? resolve(process.env.SCHEMAS_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(root.path, 'data/schemas')
		: resolve(root.path, 'app/server/.tmp/schemas');

const DATABASE_PATH = process.env.DATABASE_PATH
	? resolve(process.env.DATABASE_PATH)
	: IS_EXTERNAL_BUILD
		? resolve(root.path, 'data/data.db')
		: resolve(root.path, 'app/server/.tmp/data.db');

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
