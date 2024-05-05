<template>
	<ContentWithSideMenu :items="menuItems">
		<RouterView
			:key="($route.params.name as string)"
			v-slot="{ Component }"
		>
			<AsyncComponent
				v-if="!!Component"
				:component="Component"
			/>

			<section
				v-else
				class="container-fluid"
			>
				<hgroup>
					<h1>Single Editor</h1>
					<p>Please select a single to edit.</p>
				</hgroup>
				<div>
					<p class="secondary-text">
						<b>Singles</b> refer to schemas that only have one unique set of content associated with
						it: it can only be consumed once.
					</p>
					<p class="secondary-text">
						This is intended to be used for unique content items, such as a page on the site.
					</p>
				</div>
			</section>
		</RouterView>
	</ContentWithSideMenu>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRouter } from 'vue-router';

import AsyncComponent from '~/components/AsyncComponent/AsyncComponent.vue';
import type { MenuItem } from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import ContentWithSideMenu from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import { api } from '~/lib/services';
import { capitalize } from '~/lib/utils';

useHead({ title: 'Unify · Content · Singles' });

const router = useRouter();

const schemas = await api.getAllSingleSchemas();

const menuItems: MenuItem[] = schemas.map(
	(schema) => ({
		label: capitalize(schema.display_name),
		link: `${router.resolve({ name: 'single-contents' }).href}/${schema.name}`
	})
);

</script>

<style scoped src="./Singles.scss" />
