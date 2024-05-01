export interface Item {
	id: number;
	schema: string;
	properties: ItemProperties;
}

export interface ItemProperties {
	[key: string]: ItemProperty;
}

export type ItemProperty = string | number | boolean;
