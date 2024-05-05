<template>
	<section class="container-fluid">
		<hgroup>
			<h1>{{ capitalize(schema.display_name) }}</h1>
			<p>Edit the '{{ schema.display_name }}' single schema.</p>
		</hgroup>
		<SingleSchemaForm :schema="schema" />
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';

import SingleSchemaForm from '~/components/Form/SchemaForm/SingleSchemaForm.vue';
import { api } from '~/lib/services';
import { capitalize, notFound } from '~/lib/utils';

const route = useRoute();

const { name } = route.params;

if (typeof name !== 'string')
	throw notFound();

const schema = await api.getSingleSchema(name);

useHead({ title: `Unify · Schemas · Singles · ${schema.display_name}` });

</script>

<style scoped src="./Single.scss" />
