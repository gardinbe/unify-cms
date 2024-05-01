<template>
	<main>
		<section class="container">
			<hgroup>
				<h1>Internal application error</h1>
			</hgroup>
			<p>
				The application has unfortunately ran into an internal error. Please
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

useHead({ title: 'Unify · Error' });

</script>

<style scoped src="./Error.scss" />
