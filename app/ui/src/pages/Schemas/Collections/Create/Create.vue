<template>
	<section class="container-fluid">
		<hgroup>
			<h1>New Collection Schema</h1>
			<p>Create a new collection schema.</p>
		</hgroup>
		<CollectionSchemaForm />
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import CollectionSchemaForm from '~/components/Form/SchemaForm/CollectionSchemaForm.vue';

useHead({ title: 'Unify · Schemas · Collections · Create' });

</script>

<style scoped src="./Create.scss" />
