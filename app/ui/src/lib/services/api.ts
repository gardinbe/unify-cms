import config from '~/config';
import { UnifyApiService } from '~/lib/classes/unify-api-service.class';

/**
 * Instance of the Unify API Service.
 */
export const api = new UnifyApiService({
	hostname: config.API_HOST,
	basePath: '/internal-api'
});
