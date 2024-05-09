export type Schema = SingleSchema | CollectionSchema;

export interface SingleSchema extends BaseSchema {
	display_name: string;
}

export interface CollectionSchema extends BaseSchema {
	plural_display_name: string;
	singular_display_name: string;
	item_display_property: string;
}

interface BaseSchema {
	name: string;
	properties: SchemaProperties;
}

export interface SchemaProperties {
	[key: string]: SchemaProperty;
}

export interface SchemaProperty {
	display_name: string;
	description: string | null;
	type: SchemaPropertyType;
}

export type SchemaPropertyType = 'small-text' | 'large-text' | 'number' | 'boolean';
