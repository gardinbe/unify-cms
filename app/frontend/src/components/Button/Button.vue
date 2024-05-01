<template>
	<template v-if="type === 'router-link'">
		<!-- TODO: use dataset instead? -->
		<RouterLink
			class="btn"
			:class="{
				'btn--lg': size === 'large',
				'btn--solid': mode === 'solid',
				'btn--solid-dark': mode === 'solid-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:to="href ?? ''"
			:aria-label="ariaLabel"
		>
			<slot />
		</RouterLink>
	</template>
	<template v-else-if="type === 'anchor'">
		<a
			class="btn"
			:class="{
				'btn--lg': size === 'large',
				'btn--solid': mode === 'solid',
				'btn--solid-dark': mode === 'solid-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:href="href ?? ''"
			target="_blank"
			:aria-label="ariaLabel ?? ''"
		>
			<slot />
		</a>
	</template>
	<template v-else-if="type === 'button' || type === 'submit'">
		<button
			:type="type"
			class="btn"
			:class="{
				'btn--lg': size === 'large',
				'btn--solid': mode === 'solid',
				'btn--solid-dark': mode === 'solid-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:aria-label="ariaLabel ?? ''"
		>
			<slot />
		</button>
	</template>
</template>

<script setup lang="ts">

defineProps<{
	type: 'router-link' | 'anchor' | 'button' | 'submit';
	mode: 'solid' | 'solid-dark' | 'ghost';
	size?: 'normal' | 'large';
	href?: string;
	ariaLabel?: string;
}>();

</script>

<style scoped src="./Button.scss" />
