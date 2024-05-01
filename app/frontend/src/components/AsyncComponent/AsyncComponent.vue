<template>
	<!--
		this mode switching is scuffed, but it stops transition from
		shifting the component when it changes.

		https://vuejs.org/guide/built-ins/transition#transition-modes
		-->
	<div
		v-if="component"
		class="async-component"
	>
		<Transition :mode="fallbackVisible ? 'default' : 'out-in'">
			<Suspense
				@resolve="setFallbackHidden"
				@pending="setFallbackHidden"
				@fallback="setFallbackVisible"
			>
				<component :is="component" />
				<template #fallback>
					<Loader class="async-component-loader" />
				</template>
			</Suspense>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import type { VNode } from 'vue';
import { ref } from 'vue';
import Loader from '~/components/Loader/Loader.vue';

defineProps<{
	component: VNode | undefined;
}>();

const fallbackVisible = ref(true);

const setFallbackVisible = () => {
	fallbackVisible.value = true;
};

const setFallbackHidden = () => {
	fallbackVisible.value = false;
};

</script>

<style scoped src="./AsyncComponent.scss" />
