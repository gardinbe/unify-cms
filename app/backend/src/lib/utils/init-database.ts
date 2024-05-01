import type { Sequelize } from 'sequelize';
import 'colors';

/**
 * Synchronize and test the connection of a database.
 * @param db - Target database
 */
export const initDatabase = async (db: Sequelize) => {
	console.log('Synchronizing database...'.gray);

	try {
		//creates db if doesn't exist
		await db.sync();
		console.log('Synchronized database successfully\n'.gray);
	} catch (e) {
		console.error('Failed to synchronize database\n'.red);
		throw e;
	}

	console.log('Testing database connection...'.gray);

	try {
		//test db connection
		await db.authenticate();
		console.log('Connected to database successfully\n'.gray);
	} catch (e) {
		console.error('Failed to connect to database\n'.red);
		throw e;
	}
};
