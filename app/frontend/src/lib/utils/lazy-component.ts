import type { Component } from 'vue';
import { defineAsyncComponent, defineComponent, h } from 'vue';
import Loader from '~/components/Loader/Loader.vue';

/**
 * Lazy-loads a component with a loader.
 *
 * Routes can only resolve single components, so we create an
 * intermediary component to show/switch loader and the route
 * component.
 *
 * https://stackoverflow.com/a/59092610
 *
 * *This is dodgy Vue business...*
 * @param component - Target component to be lazy-loaded
 */
export const lazy = <T extends Component>(component: Promise<T>) => {
	const asyncComponent = defineAsyncComponent({
		loader: async () => component,
		loadingComponent: Loader
	});

	return defineComponent({ render: () => h(asyncComponent) });
};
