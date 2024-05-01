<template>
	<ContentWithSideMenu :items="menuItems">
		<RouterView
			:key="$route.params.name as string"
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
					<h1>Collection Editor</h1>
					<p>Please select a collection to edit.</p>
				</hgroup>
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

useHead({ title: 'Unify · Content · Collections' });

const router = useRouter();

const schemas = await api.getAllCollectionSchemas();

const menuItems: MenuItem[] = schemas.map(
	schema => ({
		label: capitalize(schema.plural_display_name),
		link: `${router.resolve({ name: 'collection-contents' }).href}/${schema.name}`
	})
);

</script>

<style scoped src="./Collections.scss" />
