<template>
	<div
		v-if="item"
		class="field-group"
	>
		<label>
			<p>Unique API ID.</p>
			<input
				type="number"
				placeholder="Item ID"
				disabled
				:value="item.id"
			>
		</label>
	</div>
	<ContentForm
		:mode="item ? 'update' : 'create'"
		:properties="item?.properties"
		:schema-properties="schema.properties"
		:on-submit="submit"
	>
		<template #actions>
			<Button
				v-if="item"
				type="button"
				mode="ghost"
				aria-label="Delete"
				@click.passive="_delete"
			>
				Delete
			</Button>
		</template>
	</ContentForm>
</template>

<script setup lang="ts">
import type { CollectionSchema, Item, ItemProperties } from '~shared/types';
import { useRouter } from 'vue-router';
import { api } from '~/lib/services';
import ContentForm from '~/components/Form/ContentForm/ContentForm.vue';
import Button from '~/components/Button/Button.vue';

const router = useRouter();

const props = defineProps<{
	schema: CollectionSchema;
	item?: Item | null | undefined;
}>();

const submit = async (properties: ItemProperties) => {
	if (props.item) {
		await api.updateCollectionItem(props.schema.name, props.item.id, properties);
		location.reload();
	} else {
		const created = await api.addCollectionItem(props.schema.name, properties);
		await router.push(
			router.resolve({ name: 'collection-content' }).href
			+ '/'
			+ created.created_item_id
		);
		location.reload();
	}
};

const _delete = async () => {
	if (!props.item)
		return;

	const confirmed = confirm(`Are you sure you want to delete the ${props.schema.singular_display_name} '${props.item.properties[props.schema.item_display_property]!}'?`);
	if (!confirmed)
		return;

	await api.deleteCollectionItem(props.schema.name, props.item.id);
	await router.push({ name: 'collection-content' });
	location.reload();
};

</script>

<style scoped src="./CollectionItemContentForm.scss" />
