<template>
	<RouterLink
		class="back-btn"
		:to="$route.path.slice(0, $route.path.lastIndexOf('/')) || '/'"
		aria-label="Go back"
	>
		<FontAwesomeIcon icon="fa-solid fa-arrow-left" />
	</RouterLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<style scoped src="./BackButton.scss" />
