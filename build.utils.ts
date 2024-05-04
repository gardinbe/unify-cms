import type { ExecException } from 'child_process';
import { exec as cp_exec } from 'child_process';
import { resolve } from 'path';
import { exit } from 'process';
import { promisify } from 'util';
import fsp from 'fs/promises';
import 'colors';

export interface Task {
	/** Name of the task. */
	name: string;
	/** Short description of the task. */
	description: string;
	/** Operation/function of the task. */
	operation(): void | Promise<void>;
}

export interface RunTaskOptions {
	/** Whether or not to kill the process if a task fails. */
	killOnError: boolean;
}

export const defaultRunTaskOptions: RunTaskOptions = {
	killOnError: true
};

/**
 * Runs an array of tasks sequentially.
 * @param tasks - Tasks to run
 * @param options - Options
 * @throws Error if task operation failed
 */
export const runTasks = async (tasks: Task[], options = defaultRunTaskOptions) => {
	for (const task of tasks)
		await runTask(task, options);
};

/**
 * Runs a task.
 * @param task - Task to run
 * @param options - Options
 * @throws Error if task operation failed
 */
export const runTask = async (task: Task, options = defaultRunTaskOptions) => {
	const start = Date.now();

	const elapsed = () =>
		((Date.now() - start) / 1000).toFixed(3);

	await log('Task: '.gray + task.name.yellow);
	await log('Description: '.gray + ''.reset + task.description);

	try {
		await task.operation();
		await log(`Finished in ${elapsed()}s`.gray + '\n');

	} catch (e) {
		await log(`Failed after ${elapsed()}s`.red + '\n');

		if (options.killOnError) {
			await logError(e);
			exit(1);
		}

		throw e;
	}
};

/**
 * Wrapper around `child_process.exec` to effectively handle and log stdout and stderr.
 * @param command - The command to run, with space-separated arguments
 * @returns Stdout
 * @throws Error if command failed
 */
export const exec = async (command: string) => {
	const { stderr, stdout } = await promisify(cp_exec)(command)
		.catch((e: ExecException) => {
			throw e.stderr;
		});

	if (stdout)
		await log(stdout, { toConsole: false });

	if (stderr)
		await logError(stderr, { toConsole: false });

	return stdout;
};

export interface LogOptions {
	toConsole: boolean;
}

export const defaultLogOptions: LogOptions = {
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

	const filePath = resolve(import.meta.dirname, 'build.log');
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

	const filePath = resolve(import.meta.dirname, 'build.log');
	const timestamp = new Date().toISOString();
	await fsp.appendFile(filePath, `[${timestamp}] [ERROR] ${formattedError}\n`);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/**
 * Returns the latest version of an npm package.
 * @param name - Package name
 * @returns Latest package version
 * @throws Error if failed to retrieve
 */
export const getLatestPackageVersion = async (name: string) =>
	(await exec(`npm view ${name} version`))
		.trim();
