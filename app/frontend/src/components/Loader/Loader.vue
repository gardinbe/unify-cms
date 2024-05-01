<template>
	<Transition
		appear
		name="loader-fade-in"
	>
		<div
			class="loader-wrapper"
			:data-type="type ?? 'absolute'"
		>
			<div class="loader" />
		</div>
	</Transition>
</template>

<script setup lang="ts">

defineProps<{
	type?: 'fixed' | 'absolute' | 'inline';
}>();

</script>

<style scoped src="./Loader.scss" />
