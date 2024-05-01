<template>
	<section class="container-fluid">
		<hgroup>
			<h1>{{ capitalize(schema.display_name) }}</h1>
			<p>Edit the '{{ schema.display_name }}' single.</p>
		</hgroup>
		<SingleContentForm
			:schema="schema"
			:item="item"
		/>
	</section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import SingleContentForm from '~/components/Form/ContentForm/SingleContentForm.vue';
import { api } from '~/lib/services';
import { capitalize, notFound } from '~/lib/utils';

const route = useRoute();

const { name } = route.params;
if (typeof name !== 'string')
	throw notFound();

const schema = await api.getSingleSchema(name);

useHead({ title: `Unify · Content · Singles · ${schema.display_name}` });

const item = await api.getSingle(name);

</script>

<style scoped src="./Single.scss" />
