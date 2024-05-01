import type { SchemaProperties, SchemaPropertyType } from '~shared/types';

/**
 * Checks if a set of properties matches the properties of a schema.
 * @param schemaProperties - Target schema properties
 * @param properties - Target properties
 * @returns True/False
 */
export const validateProperties = (schemaProperties: SchemaProperties, properties: object): boolean => {
	if (
		typeof properties !== 'object' ||
		properties === null ||
		Array.isArray(properties)
	)
		return false;

	for (const [name, property] of Object.entries(properties)) {
		if (!(name in schemaProperties))
			return false;

		const propertySchema = schemaProperties[name]!;

		if (!validatePropertyType(property, propertySchema.type))
			return false;
	}

	return true;
};

/**
 * Checks if the type of a property matches the schema's property type.
 * @param property - Target property
 * @param type - Target property type
 * @returns True/False
 */
const validatePropertyType = (property: unknown, type: SchemaPropertyType): boolean => {
	//do it this way in the event we want to allow integers exclusively, for example
	switch (type) {
		case 'small-text':
		case 'large-text':
			return typeof property === 'string';
		case 'number':
			return typeof property === 'number';
		case 'boolean':
			return typeof property === 'boolean';
	}
};
