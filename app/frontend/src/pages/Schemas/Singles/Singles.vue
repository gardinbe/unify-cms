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
					<h1>Single Schema Editor</h1>
					<p>Please create or select a single schema to edit.</p>
				</hgroup>
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

useHead({ title: 'Unify · Schemas · Singles' });

const router = useRouter();

const schemas = await api.getAllSingleSchemas();

const menuItems: MenuItem[] = schemas.map(
	schema => ({
		label: capitalize(schema.display_name),
		link: `${router.resolve({ name: 'single-schemas' }).href}/${schema.name}`
	})
);

const createMenuItem: MenuCreateItem = {
	link: router.resolve({ name: 'create-single-schema' }).href
};

</script>

<style scoped src="./Singles.scss" />
