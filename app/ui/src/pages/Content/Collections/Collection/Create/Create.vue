<template>
	<section class="container-fluid">
		<hgroup>
			<h1>New {{ schema.singular_display_name }}</h1>
			<p>Create a new {{ schema.singular_display_name }}.</p>
		</hgroup>
		<CollectionItemContentForm :schema="schema" />
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';

import CollectionItemContentForm from '~/components/Form/ContentForm/CollectionItemContentForm.vue';
import { api } from '~/lib/services';
import { notFound } from '~/lib/utils';

const route = useRoute();

const { name } = route.params;

if (typeof name !== 'string')
	throw notFound();

const schema = await api.getCollectionSchema(name);

useHead({ title: `Unify · Content · Collections · ${schema.plural_display_name} · New ${schema.singular_display_name}` });

</script>

<style scoped src="./Create.scss" />
