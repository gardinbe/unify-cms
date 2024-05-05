// TODO: this might not be needed?

declare module '*.vue' { // NOTE: ts-loader
	import type { Component } from 'vue';

	export default Component;
}
