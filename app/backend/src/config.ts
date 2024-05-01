import { resolve } from 'path';
import { configDotenv } from 'dotenv';
import root from 'app-root-path';
import { env } from '~shared/utils';

configDotenv({ path: resolve(import.meta.dirname, '../.env') });

export default {
	/** Whether the application has `NODE_ENV` set to `production`. */
	IS_PROD: env.str(process.env.NODE_ENV) === 'production',
	/** Absolute path of the application's root directory (directory containing top-most `node_modules`). */
	ROOT_DIR: resolve(root.path),
	/** Port the HTTP server should run on. */
	PORT: env.int(process.env.PORT)
		?? 3000,
	/** Secret cookie token. */
	COOKIE_SECRET: env.str(process.env.COOKIE_SECRET)
		?? 'secret',
	/** Absolute path of the `schemas` directory. */
	SCHEMAS_DIR: env.str(process.env.SCHEMAS_DIR)
		? resolve(env.str(process.env.SCHEMAS_DIR)!)
		: resolve(root.path, 'app/backend/schemas'),
	/** Absolute path of the database. */
	DATABASE_PATH: env.str(process.env.DATABASE_PATH)
		? resolve(env.str(process.env.DATABASE_PATH)!)
		: resolve(root.path, 'app/backend/.tmp/data.db')
} as const;
