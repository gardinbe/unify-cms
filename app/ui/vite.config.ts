import vue from '@vitejs/plugin-vue';
import root from 'app-root-path';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		vue()
	],
	resolve: {
		alias: {
			'@': resolve(root.path, 'node_modules'),
			'~': resolve(import.meta.dirname, 'src'),
			'~shared': resolve(root.path, 'app/shared')
		}
	},
	publicDir: resolve(import.meta.dirname, 'public'),
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "@/bootstrap/scss/functions";
					@import "@/bootstrap/scss/mixins/breakpoints";
					@import "@/bootstrap/scss/variables";
					@import "@/bootstrap/scss/vendor/rfs";
					@import "~/lib/scss/logic";
				`
			}
		}
	}
};

export default config;
