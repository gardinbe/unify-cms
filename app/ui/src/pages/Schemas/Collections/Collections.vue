<template>
	<ContentWithSideMenu
		:items="menuItems"
		:create-item="createMenuItem"
	>
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
					<h1>Collection Schema Editor</h1>
					<p>Please create or select a collection schema to edit.</p>
				</hgroup>
				<div>
					<p class="secondary-text">
						<b>Collections</b> refer to schemas that can have multiple sets of content associated with
						it: it can be consumed many times (by collection items).
					</p>
					<p class="secondary-text">
						This is intended for multiple content items which all share the same properties, such as a
						collection of users.
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
import type { MenuCreateItem, MenuItem } from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import ContentWithSideMenu from '~/components/ContentWithSideMenu/ContentWithSideMenu.vue';
import { api } from '~/lib/services';
import { capitalize } from '~/lib/utils';

useHead({ title: 'Unify · Schemas · Collections' });

const router = useRouter();

const schemas = await api.getAllCollectionSchemas();

const menuItems: MenuItem[] = schemas.map(
	schema => ({
		label: capitalize(schema.plural_display_name),
		link: `${router.resolve({ name: 'collection-schemas' }).href}/${schema.name}`
	})
);

const createMenuItem: MenuCreateItem = {
	link: router.resolve({ name: 'create-collection-schema' }).href
};

</script>

<style scoped src="./Collections.scss" />
