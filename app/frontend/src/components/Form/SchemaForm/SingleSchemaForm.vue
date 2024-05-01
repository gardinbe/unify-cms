<template>
	<SchemaForm
		:mode="schema ? 'update' : 'create'"
		:properties="schema?.properties"
		:on-submit="submit"
	>
		<template #attributes>
			<label>
				<p v-if="schema">
					The unique API identifier for this single.
				</p>
				<p v-else>
					Specify a unique API identifier for this single. Cannot be changed once set. Will
					be <a
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
				<p>The display name of the single. Case-insensitive.</p>
				<input
					v-model="attributes.display_name"
					type="text"
					placeholder="Display name..."
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
import type { SingleSchema, SchemaProperties } from '~shared/types';
import { useRouter } from 'vue-router';
import { api } from '~/lib/services';
import SchemaForm from '~/components/Form/SchemaForm/SchemaForm.vue';
import Button from '~/components/Button/Button.vue';

const router = useRouter();

const props = defineProps<{
	schema?: SingleSchema | null | undefined;
}>();

const attributes = reactive<Omit<SingleSchema, 'properties'>>(
	props.schema ?? {
		name: '',
		display_name: ''
	}
);

const submit = async (properties: SchemaProperties) => {
	attributes.name = encodeURIComponent(attributes.name);

	if (attributes.name.toLocaleUpperCase() === 'create') {
		alert('Single schema API identifier cannot be \'create\'');
		return;
	}

	attributes.display_name = attributes.display_name.toLocaleLowerCase();

	const schema: SingleSchema = { ...attributes, properties };

	if (props.schema) {
		await api.updateSingleSchema(schema.name, schema);
		location.reload();
	} else {
		const created = await api.addSingleSchema(schema);
		await router.push(
			router.resolve({ name: 'single-schemas' }).href
			+ '/'
			+ created.created_schema_name
		);
		location.reload();
	}
};

const _delete = async () => {
	if (!props.schema)
		return;

	const confirmed = confirm('Are you sure you want to delete this single schema? It will also remove all database entries associated with it!');
	if (!confirmed)
		return;

	await api.deleteSingleSchema(props.schema.name);
	await router.push({ name: 'single-schemas' });
	location.reload();
};

</script>

<style scoped src="./SingleSchemaForm.scss" />
