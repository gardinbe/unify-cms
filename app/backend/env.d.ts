declare namespace NodeJS {
	export interface ProcessEnv {
		/** Port the HTTP server should run on. */
		PORT?: string;
		/** Secret cookie token. */
		COOKIE_SECRET?: string;
		/** Absolute path of the `schemas` directory. */
		SCHEMAS_DIR?: string;
		/** Absolute path of the database. */
		DATABASE_PATH?: string;
	}
}
