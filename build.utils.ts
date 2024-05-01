import { exec } from 'child_process';
import 'colors';
import { promisify } from 'util';

export interface Task {
	name: string;
	description: string;
	operation(): void | Promise<void>;
}

/**
 * Run an array of tasks sequentially.
 * @param tasks - Tasks to run
 */
export const runTasks = async (tasks: Task[]) => {
	for (const task of tasks) {
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
	}
};

/**
 * Returns the latest version of an npm package.
 * @param name - Package name
 * @returns Latest package version
 */
export const getLatestPackageVersion = async (name: string) =>
	(await promisify(exec)(`npm view ${name} version`)).stdout.trim();
