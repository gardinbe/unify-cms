<template>
	<div class="side-menu-container">
		<menu class="side-menu">
			<RouterLink
				v-for="item of items"
				:key="item.link"
				:to="item.link"
			>
				{{ item.label }}
			</RouterLink>
			<RouterLink
				v-if="createItem"
				class="create-link"
				:to="createItem.link"
			>
				<FontAwesomeIcon icon="fa-solid fa-plus" />
			</RouterLink>
		</menu>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export interface MenuItem {
	label: string;
	link: string;
}

export interface MenuCreateItem {
	link: string;
}

defineProps<{
	items: MenuItem[];
	createItem?: MenuCreateItem;
}>();

</script>

<style scoped src="./ContentWithSideMenu.scss" />
