<template>
	<!-- handle route level 1 `/a` -->
	<Nav :items="navItems" />

	<RouterView v-slot="{ Component }">
		<AsyncComponent :component="Component" />
	</RouterView>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AsyncComponent from '~/components/AsyncComponent/AsyncComponent.vue';
import type { MenuItem } from '~/components/Nav/Nav.vue';
import Nav from '~/components/Nav/Nav.vue';

const router = useRouter();

/**
 * Gets the link of a route using it's name.
 * @param name - Route name
 * @returns Link URL
 */
const linkTo = (name: string) =>
	router.resolve({ name }).href;

const navItems: MenuItem[] = [
	{ label: 'Home', link: linkTo('home') },
	{ label: 'Content', link: linkTo('contents') },
	{ label: 'Schemas', link: linkTo('schemas') }
];

</script>
