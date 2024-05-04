import fsp from 'fs/promises';
import { resolve } from 'path';
import { exec, getLatestPackageVersion, log, runTasks } from './build.utils';
import 'colors';

const pkgJson = await import('./package.json');

await log('Creating Unify CMS build'.blue);
await log('Version: '.blue + pkgJson.version + '\n');

await runTasks([
	{
		name: 'clean-build-dir',
		description: 'Clean the build directory',
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
			await exec('yarn build:server');
		}
	},
	{
		name: 'build-ui',
		description: 'Build the UI',
		async operation() {
			await exec('yarn build:ui');
		}
	},
	{
		name: 'generate-resources',
		description: 'Generate files and resources for the build',
		async operation() {
			const serverPkgJson = await import('./app/server/package.json');
			const buildPkgJson = {
				private: true,
				name: 'unify-cms',
				version: pkgJson.version,
				description: 'Unify CMS build',
				license: 'ISC',
				type: 'module',
				main: 'server.js',
				engines: pkgJson.engines,
				scripts: {
					start: 'env-cmd --silent cross-env NODE_ENV=production IS_EXTERNAL_BUILD=true node server.js'
				},
				dependencies: {
					...serverPkgJson.dependencies,
					'cross-env': '^' + await getLatestPackageVersion('cross-env')
				}
			};

			await fsp.writeFile(
				resolve(import.meta.dirname, 'build/package.json'),
				JSON.stringify(buildPkgJson, undefined, '  '),
				'utf-8'
			);

			await fsp.copyFile(
				resolve(import.meta.dirname, 'app/server/.env.example'),
				resolve(import.meta.dirname, 'build/.env.example')
			);
		}
	}
]);

await log('Unify CMS build succeeded'.blue);
