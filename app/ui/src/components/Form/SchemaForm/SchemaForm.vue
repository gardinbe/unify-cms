<template>
	<form
		class="schema-form"
		novalidate
		@submit="submit"
	>
		<fieldset>
			<legend>
				Attributes
			</legend>
			<div class="field-group">
				<slot name="attributes" />
			</div>
		</fieldset>
		<fieldset>
			<legend>
				Properties
			</legend>
			<p
				v-if="flatProperties.length === 0"
				class="secondary-text"
			>
				[No properties]
			</p>
			<div
				v-for="property, index of flatProperties"
				v-else
				:key="index"
				class="field-group field-group--horizontal"
			>
				<label>
					<input
						v-model="property.name"
						type="text"
						placeholder="API identifier..."
					>
				</label>
				<label>
					<input
						v-model="property.display_name"
						type="text"
						placeholder="Display name..."
					>
				</label>
				<label>
					<select v-model="property.type">
						<option
							value=""
							disabled
							selected
						>Type...</option>
						<option value="small-text">Small Text</option>
						<option value="large-text">Large Text</option>
						<option value="number">Number</option>
						<option value="boolean">Boolean</option>
					</select>
				</label>
				<label>
					<input
						v-model="property.description"
						type="text"
						placeholder="Description..."
					>
				</label>
				<button
					class="delete-property"
					type="button"
					@click.passive="removeProperty(property)"
				>
					<FontAwesomeIcon icon="fa-solid fa-delete-left" />
				</button>
			</div>
		</fieldset>

		<div class="form-actions">
			<Button
				type="submit"
				mode="solid"
				aria-label="Create schema"
			>
				{{ mode === 'create' ? 'Create' : 'Save' }}
			</Button>
			<slot name="actions" />
			<Button
				type="button"
				mode="ghost"
				aria-label="Add new property"
				@click.passive="addProperty"
			>
				Add Property
			</Button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { reactive } from 'vue';

import Button from '~/components/Button/Button.vue';
import type { SchemaProperties, SchemaProperty, SchemaPropertyType } from '~shared/types';

const props = defineProps<{
	mode: 'create' | 'update';
	properties?: SchemaProperties | null | undefined;
	onSubmit: (schema: SchemaProperties) => void | Promise<void>;
}>();

type FlatSchemaProperty = SchemaProperty & { name: string };

// TODO: scuffed
const flatProperties = reactive<FlatSchemaProperty[]>(
	props.properties
		? Array.from(Object.entries(props.properties)).map(
			([name, attributes]) => ({ name, ...attributes })
		)
		: []
);

const addProperty = () => {
	flatProperties.push({
		name: '',
		display_name: '',
		description: '',
		type: '' as SchemaPropertyType // TODO: scuffed?
	});
};

const removeProperty = (flatSchemaProperty: FlatSchemaProperty) => {
	flatProperties.splice(
		flatProperties.indexOf(flatSchemaProperty),
		1
	);
};

const submit = async (ev: Event) => {
	ev.preventDefault();

	const properties: SchemaProperties = {};

	for (const property of flatProperties) {
		if (
			!property.name
			|| !property.display_name
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			|| !property.type
		) {
			alert('An API identifier, display name and type must be set for all properties');
			return;
		}

		const encodedName = encodeURIComponent(property.name);

		if (properties[encodedName]) {
			alert('Property API identifiers must be unique');
			return;
		}

		properties[encodedName] = {
			display_name: property.display_name,
			description: property.description || null,
			type: property.type
		};
	}

	await props.onSubmit(properties);
};

</script>

<style scoped src="./SchemaForm.scss" />
