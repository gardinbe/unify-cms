import type { Handler } from '~/lib/types';
import { logError } from '~/lib/utils';
import { Collection } from '~/models';
import type { Item, ItemProperties } from '~shared/types';

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	let items: Item[];

	try {
		items = (await Collection.findAll({ where: { schema: name } }))
			.map(
				(item) => ({
					id: item.id,
					schema: item.schema,
					properties: JSON.parse(item.properties) as ItemProperties
				})
			);
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json(items);
};

const getItem: Handler = async (req, res) => {
	const { name, id: rawId } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	if (typeof rawId !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection item ID' });
		return;
	}

	const id = parseInt(rawId);

	if (!Number.isInteger(id)) { // includes NaN check
		res.status(400).json({ error: 'Invalid collection item ID' });
		return;
	}

	let item: Item;

	try {
		const rawItem = await Collection.findOne({ where: { schema: name, id } });

		if (!rawItem) {
			res.status(404).json({ error: 'No item with this ID exists in this collection' });
			return;
		}

		item = {
			id: rawItem.id,
			schema: rawItem.schema,
			properties: JSON.parse(rawItem.properties) as ItemProperties
		};
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json(item);
};

const postItem: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	// TODO: ensure content-type is json
	const properties = req.body;

	if (
		typeof properties !== 'object'
		|| properties === null
		|| Array.isArray(properties)
	) {
		res.status(400).json({ error: 'Invalid collection item structure' });
		return;
	}

	let dbItem: Collection;

	try {
		dbItem = await Collection.create({
			schema: name,
			properties: JSON.stringify(properties)
		});
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({
		success: 'Created collection item successfully',
		created_item_id: dbItem.id
	});
};

const patchItem: Handler = async (req, res) => {
	const { name, id: rawId } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	if (typeof rawId !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection item ID' });
		return;
	}

	const id = parseInt(rawId);

	if (!Number.isInteger(id)) { // includes NaN check
		res.status(400).json({ error: 'Invalid collection item ID' });
		return;
	}

	// TODO: ensure content-type is json
	const properties = req.body;

	if (
		typeof properties !== 'object'
		|| properties === null
		|| Array.isArray(properties)
	) {
		res.status(400).json({ error: 'Invalid collection item structure' });
		return;
	}

	try {
		if (!await Collection.findOne({ where: { schema: name, id } })) {
			res.status(404).json({ error: 'No item with this ID exists in this collection' });
			return;
		}

		await Collection.update({
			properties: JSON.stringify(properties)
		}, { where: { schema: name, id } });
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Updated collection item successfully' });
};

const deleteItem: Handler = async (req, res) => {
	const { name, id: rawId } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	if (typeof rawId !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection item ID' });
		return;
	}

	const id = parseInt(rawId);

	if (!Number.isInteger(id)) { // includes NaN check
		res.status(400).json({ error: 'Invalid collection item ID' });
		return;
	}

	try {
		if (!await Collection.findOne({ where: { schema: name, id } })) {
			res.status(404).json({ error: 'No item with this ID exists in this collection' });
			return;
		}

		await Collection.destroy({ where: { schema: name, id } });
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		void logError(e);
		return;
	}

	res.status(200).json({ success: 'Deleted collection item successfully' });
};

export const internalCollectionsController = { get, getItem, postItem, patchItem, deleteItem };
