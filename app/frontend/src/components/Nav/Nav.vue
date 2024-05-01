<template>
	<nav
		ref="el"
		class="nav"
	>
		<RouterLink
			class="nav__logo"
			to="/"
		>
			<img src="/assets/img/logo/logo.png">
			<span>Unify</span>
		</RouterLink>

		<button
			class="nav__menu-btn"
			aria-label="Toggle navigation menu visibility"
			@click.passive="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</button>

		<menu class="nav__menu">
			<RouterLink
				v-for="item of items"
				:key="item.link"
				:to="item.link"
				:aria-label="`Navigate to the ${item.label} page`"
				@click.passive="close"
			>
				{{ item.label }}
			</RouterLink>
		</menu>
	</nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

export interface MenuItem {
	label: string;
	link: string;
}

defineProps<{
	items: MenuItem[];
}>();

const el = ref<HTMLElement | null>(null);

onMounted(() => {
	el.value!.dataset.menuOpen = 'false';
});

onUnmounted(() => {
	removeEventListener('click', handleWindowClick);
});

let opened = false;

const toggle = () => {
	opened
		? close()
		: open();
};

const open = () => {
	el.value!.dataset.menuOpen = 'true';
	el.value!.style.setProperty('--nav-height', el.value!.clientHeight + 'px');
	addEventListener('click', handleWindowClick, { passive: true });
	opened = true;
};

const close = () => {
	el.value!.dataset.menuOpen = 'false';
	removeEventListener('click', handleWindowClick);
	opened = false;
};

const handleWindowClick = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;

	if (!el.value!.contains(target))
		close();
};

</script>

<style scoped src="./Nav.scss" />
