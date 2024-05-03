<template>
	<main>
		<section class="container">
			<hgroup>
				<h1>Unify CMS</h1>
				<p>Welcome to Unify.</p>
			</hgroup>
			<div>
				<p>
					Unify is a lightweight, headless Content Management System. It focuses primarily on simplicity
					and ease-of-use: from concise terminology to efficient API design.
				</p>
			</div>
		</section>
		<section class="container">
			<h2>Links & Support</h2>
			<p>
				For any support or additional advice, please contact
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
