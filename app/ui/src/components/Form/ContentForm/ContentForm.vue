<template>
	<form
		class="content-form"
		novalidate
		@submit="submit"
	>
		<fieldset>
			<p
				v-if="Object.keys(schemaProperties).length === 0"
				class="secondary-text"
			>
				[No properties]
			</p>
			<!--
				TODO: using `--horizontal` here with the intention of allowing schema objects to
				appear horizontally in the future
			-->
			<div
				v-for="schemaProperty, name of schemaProperties"
				v-else
				:key="name"
				class="field-group field-group--horizontal"
			>
				<label>
					<p v-if="schemaProperty.description">
						{{ schemaProperty.description }}
					</p>
					<textarea
						v-if="getPropertyInputType(schemaProperty.type) === 'textarea'"
						v-model="(properties[name as string] as string)"
						:placeholder="capitalize(schemaProperty.display_name) + '...'"
					/>
					<input
						v-else
						v-model="properties[name as string]"
						:type="getPropertyInputType(schemaProperty.type)"
						:placeholder="capitalize(schemaProperty.display_name) + '...'"
					>
				</label>
			</div>
		</fieldset>

		<div class="form-actions">
			<Button
				type="submit"
				mode="solid"
				aria-label="Create"
			>
				{{ mode === 'create' ? 'Create' : 'Save' }}
			</Button>
			<slot name="actions" />
		</div>
	</form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import Button from '~/components/Button/Button.vue';
import { capitalize, validateProperties } from '~/lib/utils';
import type { ItemProperties, SchemaProperties, SchemaPropertyType } from '~shared/types';

const props = defineProps<{
	mode: 'create' | 'update';
	schemaProperties: SchemaProperties;
	properties?: ItemProperties | null | undefined;
	onSubmit: (properties: ItemProperties) => void | Promise<void>;
}>();

const properties = reactive<ItemProperties>(
	props.properties ?? {}
);

const getPropertyInputType = (type: SchemaPropertyType) => {
	switch (type) {
		case 'small-text':
			return 'text';
		case 'large-text':
			return 'textarea';
		case 'number':
			return 'number';
		case 'boolean':
			return 'checkbox';
	}
};

const submit = async (ev: Event) => {
	ev.preventDefault();

	if (!validateProperties(props.schemaProperties, properties)) {
		alert('This value does not match the schema!');
		return;
	}

	await props.onSubmit(properties);
};

</script>

<style scoped src="./ContentForm.scss" />
