//TODO: this might not be needed?

declare module '*.vue' { // NOTE: ts-loader
	import type { defineComponent } from 'vue';

	const component: ReturnType<typeof defineComponent>;
	export default component;
}
