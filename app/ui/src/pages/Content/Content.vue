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
						<h1>Content Editor</h1>
						<p>Please select either a single or collection to edit.</p>
					</hgroup>
					<div>
						<p class="secondary-text">
							<b>Content</b> refers to data that follows a schema.
						</p>

						<p class="secondary-text">
							It can be created and modified using the content editor. It's stored in the database
							and served over the public API.
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

useHead({ title: 'Unify · Content' });

const router = useRouter();

/**
 * Gets the link of a route using it's name.
 * @param name - Route name
 * @returns Link URL
 */
const linkTo = (name: string) =>
	router.resolve({ name }).href;

const menuItems: MenuItem[] = [
	{ label: 'Singles', link: linkTo('single-contents') },
	{ label: 'Collections', link: linkTo('collection-contents') }
];

</script>

<style scoped src="./Content.scss" />
