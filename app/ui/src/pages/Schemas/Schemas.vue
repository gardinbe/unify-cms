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
					<div>
						<p class="secondary-text">
							<b>Schemas</b> define the structure of content, and what content can be created.
						</p>
						<p class="secondary-text">
							They specify what fields should be present, along with their names, types and several
							other properties. They can be created and modified using the schemas editor. They're stored
							directly in JSON files (to allow schemas to be added to repositories).
						</p>
					</div>
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
 * @param name - Route name
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
