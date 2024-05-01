declare namespace NodeJS {
	export interface ProcessEnv {
		/** Whether or not the running instance is an external build. */
		IS_EXTERNAL_BUILD?: string;
		/** Port the HTTP server should run on. */
		PORT?: string;
		/** Secret cookie token. */
		COOKIE_SECRET?: string;
		/** Absolute path of the application logs directory. */
		LOGS_PATH?: string;
		/** Absolute path of the `schemas` directory. */
		SCHEMAS_PATH?: string;
		/** Absolute path of the database. */
		DATABASE_PATH?: string;
	}
}
