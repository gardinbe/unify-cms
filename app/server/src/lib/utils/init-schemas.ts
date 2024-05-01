import fs from 'fs';
import fsp from 'fs/promises';
import { resolve } from 'path';
import config from '~/config';

/**
 * Creates the `schemas`, `singles` and `collections` directories if they
 * don't already exist.
 */
export const initSchemaDirs = async () => {
	if (!fs.existsSync(config.SCHEMAS_PATH))
		await fsp.mkdir(config.SCHEMAS_PATH, { recursive: true });

	if (!fs.existsSync(resolve(config.SCHEMAS_PATH, 'singles')))
		await fsp.mkdir(resolve(config.SCHEMAS_PATH, 'singles'));

	if (!fs.existsSync(resolve(config.SCHEMAS_PATH, 'collections')))
		await fsp.mkdir(resolve(config.SCHEMAS_PATH, 'collections'));
};
