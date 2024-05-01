import { env } from '~shared/utils';

export default {
	/** Hostname of the API. */
	API_HOST: env.str(import.meta.env.VITE_API_HOST)
		?? 'http://localhost:3000'
} as const;
