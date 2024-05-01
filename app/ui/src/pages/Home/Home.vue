<template>
	<main>
		<section class="container">
			<hgroup>
				<h1>Unify CMS</h1>
				<p>Welcome to the Unify Content Management System.</p>
			</hgroup>
			<p>
				Please use the navigation buttons to navigate to the section you are looking
				for.
			</p>
		</section>
		<section class="container">
			<h2>Links & Support</h2>
			<p>
				For any additional tips and tricks, please contact
				<a href="mailto:gardinbe@gmail.com">gardinbe@gmail.com</a>.
			</p>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({ title: 'Unify' });

</script>

<style scoped src="./Home.scss" />
