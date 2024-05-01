import type { Item, ItemProperties } from '~shared/types';
import type { Handler } from '~/lib/types';
import { Single } from '~/models';
import { logError } from '~/lib/utils';

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single name' });
		return;
	}

	let item: Item;

	try {
		const rawSingle = await Single.findOne({ where: { schema: name } });

		if (!rawSingle) {
			res.status(404).json({ error: 'No content exists for this single' });
			return;
		}

		item = {
			id: rawSingle.id,
			schema: rawSingle.schema,
			properties: JSON.parse(rawSingle.properties) as ItemProperties
		};

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json(item);
};

const post: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single name' });
		return;
	}

	//TODO: ensure content-type is json, and correct structure
	const properties = req.body;

	if (
		typeof properties !== 'object' ||
		properties === null ||
		Array.isArray(properties)
	) {
		res.status(400).json({ error: 'Invalid single structure' });
		return;
	}

	try {
		await Single.create({
			schema: name,
			properties: JSON.stringify(properties)
		});

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Created single successfully' });
};

const patch: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single name' });
		return;
	}

	//TODO: ensure content-type is json, and correct structure
	const properties = req.body;

	if (
		typeof properties !== 'object' ||
		properties === null ||
		Array.isArray(properties)
	) {
		res.status(400).json({ error: 'Invalid single structure' });
		return;
	}

	try {
		if (!await Single.findOne({ where: { schema: name } })) {
			res.status(404).json({ error: 'No content exists for this single' });
			return;
		}

		await Single.update({
			properties: JSON.stringify(properties)
		}, { where: { schema: name } });

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Updated single successfully' });
};

export const privateSinglesController = { get, post, patch };
