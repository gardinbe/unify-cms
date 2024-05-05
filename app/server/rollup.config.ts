import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import root from 'app-root-path';
import { resolve } from 'path';
import type { RollupOptions } from 'rollup';
import autoExternal from 'rollup-plugin-auto-external';

const options: RollupOptions = {
	plugins: [
		alias({
			entries: {
				'@': resolve(root.path, 'node_modules'),
				'~': resolve(import.meta.dirname, 'src'),
				'~shared': resolve(root.path, 'app/shared')
			}
		}),
		nodeResolve(),
		autoExternal(),
		typescript({
			include: [
				'./**/*.ts+(|x)',
				'../shared/**/*.ts+(|x)'
			]
		}),
		commonjs(),
		json()
	],
	input: 'src/server.ts',
	output: {
		dir: 'dist',
		format: 'module'
	}
};

export default options;
