import { resolve } from 'path';
import root from 'app-root-path';
import type { RollupOptions } from 'rollup';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
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
