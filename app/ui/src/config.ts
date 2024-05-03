const API_HOST = import.meta.env.VITE_API_HOST
	|| 'http://localhost:1234';

export default {
	/** Hostname of the API. */
	API_HOST
} as const;
