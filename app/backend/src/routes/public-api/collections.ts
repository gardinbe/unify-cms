import type { ItemProperties } from '~shared/types';
import type { Handler } from '~/lib/types';
import { Collection } from '~/models';

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid collection name' });
		return;
	}

	let itemsProperties: ItemProperties[];

	try {
		itemsProperties = (await Collection.findAll({ where: { schema: name } }))
			.map(
				item => ({
					id: item.id, //TODO: reconsider slapping id with properties?
					...JSON.parse(item.properties) as ItemProperties
				})
			);

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		console.error(e);
		return;
	}

	res.status(200).json(itemsProperties);
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

	if (!Number.isInteger(id)) { //includes NaN check
		res.status(400).json({ error: 'Invalid collection item ID' });
		return;
	}

	let itemProperties: ItemProperties;

	try {
		const rawItem = await Collection.findOne({ where: { schema: name, id } });

		if (!rawItem) {
			res.status(404).json({ error: 'No item with this ID exists in this collection' });
			return;
		}

		itemProperties = {
			id: rawItem.id, //TODO: reconsider slapping id with properties?
			...JSON.parse(rawItem.properties) as ItemProperties
		};

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		console.error(e);
		return;
	}

	res.status(200).json(itemProperties);
};

export const publicCollectionsController = { get, getItem };
