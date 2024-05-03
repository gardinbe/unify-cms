import type { ItemProperties } from '~shared/types';
import type { Handler } from '~/lib/types';
import { Single } from '~/models';
import { logError } from '~/lib/utils';

const get: Handler = async (req, res) => {
	const { name } = req.params;

	if (typeof name !== 'string') {
		res.status(400).json({ error: 'Missing or invalid single name' });
		return;
	}

	let itemProperties: ItemProperties;

	try {
		const rawSingle = await Single.findOne({ where: { schema: name } });

		if (!rawSingle) {
			res.status(404).json({ error: 'No single exists with this name' });
			return;
		}

		itemProperties = JSON.parse(rawSingle.properties) as ItemProperties;

	} catch (e) {
		res.status(500).json({ error: 'Internal server error' });
		logError(e);
		return;
	}

	res.status(200).json(itemProperties);
};

export const publicSinglesController = { get };
