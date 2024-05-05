<template>
	<ContentWithSideMenu
		:items="menuItems"
		:create-item="createMenuItem"
	>
		<RouterView
			:key="($route.params.id as string)"
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
					<h1>{{ capitalize(schema.plural_display_name) }}</h1>
					<p>Please create or select a {{ schema.singular_display_name }} to edit.</p>
				</hgroup>
			</section>
		</RouterView>
	</ContentWithSideMenu>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute, useRouter } from 'vue-router';

import AsyncComponent from '~/components/AsyncComponent/AsyncComponent.vue';
import type { MenuCreateItem, MenuItem } from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import ContentWithSideMenu from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import { api } from '~/lib/services';
import { capitalize, notFound } from '~/lib/utils';

const router = useRouter();

const route = useRoute();

const { name } = route.params;

if (typeof name !== 'string')
	throw notFound();

const schema = await api.getCollectionSchema(name);

useHead({ title: `Unify · Content · Collections · ${schema.plural_display_name}` });

const items = await api.getCollectionItems(name);

const menuItems: MenuItem[] = items.map(
	(item) => ({
		label: item.properties[schema.item_display_property] as string,
		link: `${router.resolve({ name: 'collection-content' }).href}/${item.id}`
	})
);

const createMenuItem: MenuCreateItem = {
	link: router.resolve({ name: 'create-collection-item' }).href
};

</script>

<style scoped src="./Collection.scss" />
