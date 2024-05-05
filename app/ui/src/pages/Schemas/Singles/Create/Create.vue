<template>
	<section class="container-fluid">
		<hgroup>
			<h1>New Single Schema</h1>
			<p>Create a new single schema.</p>
		</hgroup>
		<SingleSchemaForm />
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import SingleSchemaForm from '~/components/Form/SchemaForm/SingleSchemaForm.vue';

useHead({ title: 'Unify · Schemas · Singles · Create' });

</script>

<style scoped src="./Create.scss" />
