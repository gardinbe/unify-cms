<template>
	<div ref="el">
		<slot v-if="!content" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { TerminalTyperOptions } from '~/lib/utils';
import { TerminalTyper } from '~/lib/utils';

const props = defineProps<TerminalTyperOptions>();

const el = ref<HTMLElement | null>(null);

onMounted(() => {
	void new TerminalTyper(
		el.value!,
		props as TerminalTyperOptions
	).start();
});

</script>

<style scoped src="./TerminalTyper.scss" />
