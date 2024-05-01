<template>
	<main>
		<section class="container">
			<hgroup>
				<h1>Page Not Found</h1>
			</hgroup>
			<p>
				Sorry, the requested content could not be found. Please
				<RouterLink
					to="/"
					aria-label="Return to homepage"
					v-html="'return to the home page'"
				/>.
			</p>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({ title: 'Unify · Not Found' });
</script>

<style scoped src="./NotFound.scss" />
