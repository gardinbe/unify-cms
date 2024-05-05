<template>
	<ContentForm
		:mode="item ? 'update' : 'create'"
		:properties="item?.properties"
		:schema-properties="schema.properties"
		:on-submit="submit"
	/>
</template>

<script setup lang="ts">
import ContentForm from '~/components/Form/ContentForm/ContentForm.vue';
import { api } from '~/lib/services';
import type { Item, ItemProperties, SingleSchema } from '~shared/types';

const props = defineProps<{
	schema: SingleSchema;
	item?: Item | null | undefined;
}>();

const submit = async (properties: ItemProperties) => {
	if (props.item)
		await api.updateSingle(props.schema.name, properties);
	else
		await api.setSingle(props.schema.name, properties);

	location.reload();
};

</script>

<style scoped src="./SingleContentForm.scss" />
