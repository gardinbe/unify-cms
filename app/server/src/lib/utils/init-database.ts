import type { Sequelize } from 'sequelize';
import { log, logError } from '~/lib/utils';
import 'colors';

/**
 * Synchronizes and tests the connection of a database.
 * @param db - Target database
 */
export const initDatabase = async (db: Sequelize) => {
	log('Initializing database'.gray);

	try {
		//creates db if doesn't exist
		await db.sync();
	} catch (e) {
		logError('Failed to synchronize database'.red);
		throw e;
	}

	log('Checking database connection'.gray);

	try {
		//test db connection
		await db.authenticate();
	} catch (e) {
		logError('Failed to connect to database'.red);
		throw e;
	}
};
