import fsp from 'fs/promises';
import fs from 'fs';
import { resolve } from 'path';
import type { SingleSchema } from '~shared/types';
import type { Handler } from '~/lib/types';
import config from '~/config';
import { Single } from '~/models';
import { logError } from '~/lib/utils';

const getAll: Handler = async (_req, res) => {
	let schemas: SingleSchema[];

	try {
		const fileNames = await fsp.readdir(
			resolve(config.SCHEMAS_PATH, 'singles')
		);

		schemas = await Promise.all(
			fileNames.map(async fileName => (
				JSON.parse(
					await fsp.readFile(
						resolve(config.SCHEMAS_PATH, `singles/${fileName}`),
						'utf-8'
					)
				) as SingleSchema
			))
		);

	} catch (e) {
		res.status(404).json({ error: 'No single schema exists with this name' });
		return;
	}

	res.status(200).json(schemas);
};

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing single schema name' });
		return;
	}

	let schema: SingleSchema;

	try {
		schema = JSON.parse(
			await fsp.readFile(
				resolve(config.SCHEMAS_PATH, `singles/${name}.json`),
				'utf-8'
			)
		) as SingleSchema;

	} catch (e) {
		res.status(404).json({ error: 'No single schema exists with this name' });
		return;
	}

	res.status(200).json(schema);
};

const post: Handler = async (req, res) => {
	//TODO: ensure content-type is json, and correct structure
	const schema = req.body;

	if (
		!('name' in schema) ||
		typeof schema.name !== 'string' ||
		schema.name === 'create' ||
		!('display_name' in schema) ||
		typeof schema.display_name !== 'string' ||
		!('properties' in schema) ||
		typeof schema.properties !== 'object' ||
		schema.properties === null ||
		Array.isArray(schema.properties)
	) {
		res.status(400).json({ error: 'Invalid single schema structure' });
		return;
	}

	try {
		if (
			fs.existsSync(
				resolve(config.SCHEMAS_PATH, `singles/${schema.name}.json`)
			)
		) {
			res.status(400).json({ error: 'A single schema already exists with this name' });
			return;
		}

		await fsp.writeFile(
			resolve(config.SCHEMAS_PATH, `singles/${schema.name}.json`),
			JSON.stringify(schema, undefined, '  '),
			'utf-8'
		);

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		logError(e);
		return;
	}

	res.status(200).json({
		success: 'Created single schema successfully',
		created_schema_name: schema.name
	});
};

const patch: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single schema name' });
		return;
	}

	//TODO: ensure content-type is json, and correct structure
	const schema = req.body;

	if (
		!('name' in schema) ||
		typeof schema.name !== 'string' ||
		schema.name === 'create' ||
		!('display_name' in schema) ||
		typeof schema.display_name !== 'string' ||
		!('properties' in schema) ||
		typeof schema.properties !== 'object' ||
		schema.properties === null ||
		Array.isArray(schema.properties)
	) {
		res.status(400).json({ error: 'Invalid single schema structure' });
		return;
	}

	try {
		if (
			!fs.existsSync(
				resolve(config.SCHEMAS_PATH, `singles/${name}.json`)
			)
		) {
			res.status(400).json({ error: 'No single schema exists with this name' });
			return;
		}

		await fsp.writeFile(
			resolve(config.SCHEMAS_PATH, `singles/${name}.json`),
			JSON.stringify(schema, undefined, '  '),
			'utf-8'
		);

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		logError(e);
		return;
	}

	res.status(200).json({ success: 'Updated single schema successfully' });
};

const _delete: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single schema name' });
		return;
	}

	try {
		if (
			!fs.existsSync(
				resolve(config.SCHEMAS_PATH, `singles/${name}.json`)
			)
		) {
			res.status(400).json({ error: 'No single schema exists with this name' });
			return;
		}

		await fsp.unlink(
			resolve(config.SCHEMAS_PATH, `singles/${name}.json`)
		);

		await Single.destroy({ where: { schema: name } });

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		logError(e);
		return;
	}

	res.status(200).json({ success: 'Deleted single schema successfully' });
};

export const internalSinglesSchemaController = { getAll, get, post, patch, delete: _delete };
