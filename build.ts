import fsp from 'fs/promises';
import { resolve } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { getLatestPackageVersion, runTasks } from './build.utils';
import 'colors';

const packageJson = await import('./package.json');

console.log('Creating Unify CMS build'.blue);
console.log('Version: '.blue + packageJson.version + '\n');

await runTasks([
	{
		name: 'pre-build',
		description: 'Clean build directory',
		async operation() {
			await fsp.rm(
				resolve(import.meta.dirname, 'build'),
				{ recursive: true, force: true }
			);
			await fsp.mkdir(
				resolve(import.meta.dirname, 'build')
			);
		}
	},
	{
		name: 'build-server',
		description: 'Build the server',
		async operation() {
			await promisify(exec)('yarn build:server');
		}
	},
	{
		name: 'build-ui',
		description: 'Build the UI',
		async operation() {
			await promisify(exec)('yarn build:ui');
		}
	},
	{
		name: 'generate-resources',
		description: 'Generate resources for the build',
		async operation() {
			const serverPackageJson = await import('./app/server/package.json');
			const buildPackageJson = {
				private: true,
				name: 'unify-cms',
				version: packageJson.version,
				description: 'Unify CMS build',
				license: 'ISC',
				type: 'module',
				main: 'server.js',
				engines: packageJson.engines,
				scripts: {
					start: 'env-cmd --silent cross-env NODE_ENV=production IS_EXTERNAL_BUILD=true node server.js'
				},
				dependencies: {
					...serverPackageJson.dependencies,
					'cross-env': '^' + await getLatestPackageVersion('cross-env')
				}
			};

			await fsp.writeFile(
				resolve(import.meta.dirname, 'build/package.json'),
				JSON.stringify(buildPackageJson, undefined, '  '),
				'utf-8'
			);

			await fsp.copyFile(
				resolve(import.meta.dirname, 'app/server/.env.example'),
				resolve(import.meta.dirname, 'build/.env.example')
			);
		}
	}
]);

console.log('Unify CMS build succeeded'.green);
