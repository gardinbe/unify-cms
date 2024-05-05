<template>
	<section class="container-fluid">
		<hgroup>
			<h1>{{ capitalize(schema.plural_display_name) }}</h1>
			<p>Edit the '{{ schema.plural_display_name }}' collection schema.</p>
		</hgroup>
		<CollectionSchemaForm :schema="schema" />
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';

import CollectionSchemaForm from '~/components/Form/SchemaForm/CollectionSchemaForm.vue';
import { api } from '~/lib/services';
import { capitalize, notFound } from '~/lib/utils';

const route = useRoute();

const { name } = route.params;

if (typeof name !== 'string')
	throw notFound();

const schema = await api.getCollectionSchema(name);

useHead({ title: `Unify · Schemas · Collections · ${schema.plural_display_name}` });

</script>

<style scoped src="./Collection.scss" />
