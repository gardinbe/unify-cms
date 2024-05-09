import fs from 'fs';
import fsp from 'fs/promises';
import { resolve } from 'path';

import config from '~/config';
import type { Handler } from '~/lib/types';
import { logError } from '~/lib/utils';
import { Collection } from '~/models';
import type { CollectionSchema } from '~shared/types';

const getAll: Handler = async (_req, res) => {
	let schemas: CollectionSchema[];

	try {
		const fileNames = await fsp.readdir(
			resolve(config.SCHEMAS_PATH, 'collections')
		);

		schemas = await Promise.all(
			fileNames.map(async (fileName) => (
				JSON.parse(
					await fsp.readFile(
						resolve(config.SCHEMAS_PATH, `collections/${fileName}`),
						'utf-8'
					)
				) as CollectionSchema
			))
		);
	} catch (e) {
		res.status(404).json({ error: 'No collection schema exists with this name' });
		return;
	}

	res.status(200).json(schemas);
};

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing collection schema name' });
		return;
	}

	let schema: CollectionSchema;

	try {
		schema = JSON.parse(
			await fsp.readFile(
				resolve(config.SCHEMAS_PATH, `collections/${name}.json`),
				'utf-8'
			)
		) as CollectionSchema;
	} catch (e) {
		res.status(404).json({ error: 'No collection schema exists with this name' });
		return;
	}

	res.status(200).json(schema);
};

const post: Handler = async (req, res) => {
	// TODO: ensure content-type is json
	const schema = req.body;

	if (!validCollectionSchema(schema)) {
		res.status(400).json({ error: 'Invalid collection schema structure' });
		return;
	}

	try {
		if (
			fs.existsSync(
				resolve(config.SCHEMAS_PATH, `collections/${schema.name}.json`)
			)
		) {
			res.status(400).json({ error: 'A collection schema already exists with this name' });
			return;
		}

		await fsp.writeFile(
			resolve(config.SCHEMAS_PATH, `collections/${schema.name}.json`),
			JSON.stringify(schema, undefined, '  '),
			'utf-8'
		);
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({
		success: 'Created collection schema successfully',
		created_schema_name: schema.name
	});
};

const patch: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection schema name' });
		return;
	}

	// TODO: ensure content-type is json
	const schema = req.body;

	if (!validCollectionSchema(schema)) {
		res.status(400).json({ error: 'Invalid collection schema structure' });
		return;
	}

	try {
		if (
			!fs.existsSync(
				resolve(config.SCHEMAS_PATH, `collections/${name}.json`)
			)
		) {
			res.status(400).json({ error: 'No collection schema exists with this name' });
			return;
		}

		await fsp.writeFile(
			resolve(config.SCHEMAS_PATH, `collections/${name}.json`),
			JSON.stringify(schema, undefined, '  '),
			'utf-8'
		);
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Updated collection schema successfully' });
};

const _delete: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection schema name' });
		return;
	}

	try {
		if (
			!fs.existsSync(
				resolve(config.SCHEMAS_PATH, `collections/${name}.json`)
			)
		) {
			res.status(400).json({ error: 'No collection schema exists with this name' });
			return;
		}

		await fsp.unlink(
			resolve(config.SCHEMAS_PATH, `collections/${name}.json`)
		);

		await Collection.destroy({ where: { schema: name } });
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Deleted collection schema successfully' });
};

export const internalCollectionsSchemaController = { getAll, get, post, patch, delete: _delete };

/**
 * Checks if the provided object is a valid collection schema.
 * @param schema - Schema to check
 * @returns Validity
 */
const validCollectionSchema = (schema: unknown): schema is CollectionSchema =>
	typeof schema === 'object'
	&& schema !== null
	&& !Array.isArray(schema)
	&& 'name' in schema
	&& typeof schema.name === 'string'
	&& schema.name !== 'create'
	&& 'plural_display_name' in schema
	&& typeof schema.plural_display_name === 'string'
	&& 'singular_display_name' in schema
	&& typeof schema.singular_display_name === 'string'
	&& 'item_display_property' in schema
	&& typeof schema.item_display_property === 'string'
	&& 'properties' in schema
	&& typeof schema.properties === 'object'
	&& schema.properties !== null
	&& !Array.isArray(schema.properties);
