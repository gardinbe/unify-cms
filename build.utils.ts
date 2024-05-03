import { exec } from 'child_process';
import 'colors';
import { promisify } from 'util';

export interface Task {
	/** Name of the task. */
	name: string;
	/** Short description of the task. */
	description: string;
	/** Operation/function of the task. */
	operation(): void | Promise<void>;
}

/**
 * Runs an array of tasks sequentially.
 * @param tasks - Target tasks
 */
export const runTasks = async (tasks: Task[]) => {
	for (const task of tasks)
		await runTask(task);
};

/**
 * Runs a task.
 * @param task - Target task
 */
export const runTask = async (task: Task) => {
	const start = Date.now();

	const elapsed = () =>
		((Date.now() - start) / 1000).toFixed(3);

	console.info('Task: '.gray + task.name.yellow);
	console.info('Description: '.gray + ''.reset + task.description);

	try {
		await task.operation();
		console.info(`Finished in ${elapsed()}s`.gray + '\n');

	} catch (e) {
		console.info(`Failed after ${elapsed()}s`.red);
		console.error(e);
	}
};

/**
 * Returns the latest version of an npm package.
 * @param name - Package name
 * @returns Latest package version
 */
export const getLatestPackageVersion = async (name: string) =>
	(await promisify(exec)(`npm view ${name} version`)).stdout.trim();
