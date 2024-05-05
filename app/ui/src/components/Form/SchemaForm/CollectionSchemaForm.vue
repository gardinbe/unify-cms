<template>
	<SchemaForm
		:mode="schema ? 'update' : 'create'"
		:properties="schema?.properties"
		:on-submit="submit"
	>
		<template #attributes>
			<label>
				<p v-if="schema">
					The unique API identifier for this collection.
				</p>
				<p v-else>
					Specify a unique API identifier for this collection. Cannot be changed once set. Case-insensitive.
					Will be <a
						href="https://www.w3schools.com/tags/ref_urlencode.ASP"
						target="_blank"
					>URL encoded</a>.
				</p>
				<input
					v-model="attributes.name"
					type="text"
					placeholder="API identifier..."
					:disabled="!!schema"
				>
			</label>

			<label>
				<p>The <b>plural</b> display name of the collection. Case-insensitive.</p>
				<input
					v-model="attributes.plural_display_name"
					type="text"
					placeholder="Plural display name..."
				>
			</label>

			<label>
				<p>The <b>singular</b> display name of a collection item. Case-insensitive.</p>
				<input
					v-model="attributes.singular_display_name"
					type="text"
					placeholder="Singular display name..."
				>
			</label>

			<label>
				<p>The API identifier of the property to use as the display name for each collection item.</p>
				<input
					v-model="attributes.item_display_property"
					type="text"
					placeholder="Item display property..."
				>
			</label>
		</template>

		<template #actions>
			<Button
				v-if="schema"
				type="button"
				mode="ghost"
				aria-label="Delete"
				@click.passive="_delete"
			>
				Delete
			</Button>
		</template>
	</SchemaForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import Button from '~/components/Button/Button.vue';
import SchemaForm from '~/components/Form/SchemaForm/SchemaForm.vue';
import { api } from '~/lib/services';
import type { CollectionSchema, SchemaProperties } from '~shared/types';

const router = useRouter();

const props = defineProps<{
	schema?: CollectionSchema | null | undefined;
}>();

const attributes = reactive<Omit<CollectionSchema, 'properties'>>(
	props.schema ?? {
		name: '',
		singular_display_name: '',
		plural_display_name: '',
		item_display_property: ''
	}
);

const submit = async (properties: SchemaProperties) => {
	attributes.name = encodeURIComponent(attributes.name.toLocaleLowerCase());
	attributes.plural_display_name = attributes.plural_display_name.toLocaleLowerCase();
	attributes.singular_display_name = attributes.singular_display_name.toLocaleLowerCase();
	attributes.item_display_property = encodeURIComponent(attributes.item_display_property);

	if (
		!attributes.name
		|| !attributes.plural_display_name
		|| !attributes.singular_display_name
		|| !attributes.item_display_property
	) {
		alert('Collection schema must have an API identifier, plural display name, singular display name and an item display property set');
		return;
	}

	if (attributes.name === 'create') {
		alert('Collection schema API identifier cannot be \'create\'');
		return;
	}

	if (!properties[attributes.item_display_property]) {
		alert('Item display property API identifier must be set to an existing property');
		return;
	}

	const schema: CollectionSchema = { ...attributes, properties };

	if (props.schema) {
		await api.updateCollectionSchema(schema.name, schema);
		location.reload();
	} else {
		const created = await api.addCollectionSchema(schema);
		await router.push(
			router.resolve({ name: 'collection-schemas' }).href
			+ '/'
			+ created.created_schema_name
		);
		location.reload();
	}
};

const _delete = async () => {
	if (!props.schema)
		return;

	const confirmed = confirm('Are you sure you want to delete this collection schema? It will also remove all database entries associated with it!');
	if (!confirmed)
		return;

	await api.deleteCollectionSchema(props.schema.name);
	await router.push({ name: 'collection-schemas' });
	location.reload();
};

</script>

<style scoped src="./CollectionSchemaForm.scss" />
