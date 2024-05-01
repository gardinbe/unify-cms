import fs from 'fs';
import fsp from 'fs/promises';
import { resolve } from 'path';
import config from '~/config';

interface LogOptions {
	file: string;
	toConsole: boolean;
}

/**
 * Logs a message to the console and to a file.
 * @param message - Target message
 * @param file - Target file name **without extension**: `logs/[filename].log`
 */
export const log = async (message: string, options: LogOptions = { file: 'server', toConsole: true }) => {
	if (options.toConsole)
		console.log(message);

	const filePath = resolve(config.LOGS_PATH, options.file + '.log');
	const timestamp = new Date().toISOString();
	await fsp.appendFile(
		filePath,
		`[${timestamp}] ${message}\n`
	);
};

/**
 * Logs an error to the console and to a file.
 * @param error - Target error
 * @param file - Target file name **without extension**: `logs/[filename].log`
 */
export const logError = async (error: unknown, options: LogOptions = { file: 'server', toConsole: true }) => {
	if (options.toConsole)
		console.error(error);

	const filePath = resolve(config.LOGS_PATH, options.file + '.log');
	const timestamp = new Date().toISOString();
	await fsp.appendFile(
		filePath,
		`[${timestamp}] [ERROR] ${error as string}\n`
	);
};

/**
 * Logs a message to the console and to a file **synchronously**.
 * @param message - Target message
 * @param file - Target file name **without extension**: `logs/[filename].log`
 */
export const logSync = (...args: Parameters<typeof log>) => {
	void log(...args);
};

/**
 * Logs an error to the console and to a file **synchronously**.
 * @param error - Target message
 * @param file - Target file name **without extension**: `logs/[filename].log`
 */
export const logErrorSync = (...args: Parameters<typeof logError>) => {
	void logError(...args);
};

/**
 * Creates the `logs` directory if it doesn't already exist.
 */
export const initLogsDir = async () => {
	if (!fs.existsSync(config.LOGS_PATH))
		await fsp.mkdir(config.LOGS_PATH, { recursive: true });
};
