import fs from 'fs';
import fsp from 'fs/promises';
import { resolve } from 'path';

import config from '~/config';

interface LogOptions {
	/** File name **without extension** to log to under the `config.LOGS_PATH` directory. */
	file: string;
	/** Whether or not to log the message to the console as well. */
	toConsole: boolean;
}

export const defaultLogOptions: LogOptions = {
	file: 'server',
	toConsole: true
};

/**
 * Logs a message to the console and to a file.
 * @param message - Message
 * @param options - Options
 */
export const log = async (message: string, options?: Partial<LogOptions>) => {
	const _options = { ...defaultLogOptions, ...options };

	if (_options.toConsole)
		console.log(message);

	const filePath = resolve(config.LOGS_PATH, _options.file + '.log');
	const timestamp = new Date().toISOString();
	await fsp.appendFile(filePath, `[${timestamp}] ${message.strip}\n`);
};

/**
 * Logs an error to the console and to a file.
 * @param error - Error
 * @param options - Options
 */
export const logError = async (error: unknown, options?: Partial<LogOptions>) => {
	const _options = { ...defaultLogOptions, ...options };

	if (_options.toConsole)
		console.error(error);

	const formattedError = typeof error === 'string'
		? error.strip
		: error as string;

	const filePath = resolve(config.LOGS_PATH, _options.file + '.log');
	const timestamp = new Date().toISOString();
	await fsp.appendFile(filePath, `[${timestamp}] [ERROR] ${formattedError}\n`);
};

/**
 * Creates the `logs` directory if it doesn't already exist.
 */
export const initLogsDir = async () => {
	if (!fs.existsSync(config.LOGS_PATH))
		await fsp.mkdir(config.LOGS_PATH, { recursive: true });
};
