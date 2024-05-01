<template>
	<main>
		<ContentWithSideMenu :items="menuItems">
			<RouterView v-slot="{ Component }">
				<AsyncComponent
					v-if="!!Component"
					:component="Component"
				/>

				<section
					v-else
					class="container-fluid"
				>
					<hgroup>
						<h1>Schema Editor</h1>
						<p>Please select either a single or collection schema to edit.</p>
					</hgroup>
				</section>
			</RouterView>
		</ContentWithSideMenu>
	</main>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRouter } from 'vue-router';
import AsyncComponent from '~/components/AsyncComponent/AsyncComponent.vue';
import type { MenuItem } from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import ContentWithSideMenu from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';

useHead({ title: 'Unify · Schemas' });

const router = useRouter();

/**
 * Gets the link of a route using it's name.
 * @param name - Target route name
 * @returns Link URL
 */
const linkTo = (name: string) =>
	router.resolve({ name }).href;

const menuItems: MenuItem[] = [
	{ label: 'Singles', link: linkTo('single-schemas') },
	{ label: 'Collections', link: linkTo('collection-schemas') }
];

</script>

<style scoped src="./Schemas.scss" />
