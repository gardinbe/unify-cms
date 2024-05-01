import type { Router } from 'vue-router';

const enum AppError {
	NOT_FOUND = 'NOT_FOUND_ERROR',
	BAD_REQUEST = 'BAD_REQUEST',
	SERVER_ERROR = 'SERVER_ERROR',
	INTERNAL_ERROR = 'INTERNAL_ERROR'
}

/**
 * Returns an error that indicates that the requested content or page could not be found.
 *
 * Redirects the user to the 'not found' page if thrown.
 */
export const notFound = () =>
	new Error(AppError.NOT_FOUND);

/**
 * Returns an error indicating that an API responded with status code 400.
 */
export const badRequest = (message: string) =>
	new Error(AppError.BAD_REQUEST + ':' + message);

/**
 * Returns an error indicating there was an error setting or retrieving API content.
 *
 * Redirects the user to the 'internal error' page if thrown.
 */
export const serverError = () =>
	new Error(AppError.SERVER_ERROR);

/**
 * Returns an error indicating there was an internal application error.
 *
 * Redirects the user to the 'internal error' page if thrown.
 */
export const internalError = () =>
	new Error(AppError.INTERNAL_ERROR);

/**
 * Returns a function to handle global errors with the Vue application.
 * @param router - Vue router instance
 * @returns Error handler
 */
export const errorHandler = (router: Router) =>
	(err: unknown) => {
		if (!(err instanceof Error)) {
			console.error(err);
			return;
		}

		const [msg, value] = err.message.split(':') as [AppError, string | undefined];

		switch (msg) {
			case AppError.NOT_FOUND:
				console.error('Page or content not found');
				void router.push('/not-found');
				break;

			case AppError.BAD_REQUEST:
				alert(value);
				//TODO: maybe not ideal
				window.history.go(-1);
				break;

			case AppError.INTERNAL_ERROR:
			case AppError.SERVER_ERROR:
			default:
				console.error('Internal application error occurred');
				void router.push('/error');
				break;
		}

		if (!import.meta.env.PROD)
			console.error(err);
	};
