<template>
	<section class="container-fluid">
		<hgroup>
			<h1>{{ item.properties[schema.item_display_property]! }}</h1>
			<p>Edit the {{ schema.singular_display_name }} '{{ item.properties[schema.item_display_property]! }}'.</p>
		</hgroup>
		<CollectionItemContentForm
			:schema="schema"
			:item="item"
		/>
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';

import CollectionItemContentForm from '~/components/Form/ContentForm/CollectionItemContentForm.vue';
import { api } from '~/lib/services';
import { internalError, notFound } from '~/lib/utils';

useHead({ title: 'Unify · Editor · Singles' });

const route = useRoute();

const { name, id: rawId } = route.params;
if (typeof name !== 'string' || typeof rawId !== 'string')
	throw notFound();

const id = parseInt(rawId);
if (isNaN(id))
	throw notFound();

const schema = await api.getCollectionSchema(name);
const item = await api.getCollectionItem(name, id);

useHead({ title: `Unify · Content · Collections · ${schema.plural_display_name} · ${item.properties[schema.item_display_property]!}` });

if (item.schema !== name)
	throw internalError();

</script>

<style scoped src="./Item.scss" />
