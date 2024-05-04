import { throwExp } from '~/lib/utils';

/**
 * Converts a string to an integer.
 * @param value - String
 * @returns Integer
 * @throws Error if conversion failed
 */
export const strToInt = (value: string) => {
	const intValue = parseInt(value);
	return !isNaN(intValue)
		? intValue
		: throwExp(`Terminal-typer effect value '${value}' is invalid`);
};

/**
 * Converts a string to a float.
 * @param value - String
 * @returns Float
 * @throws Error if conversion failed
 */
export const strToFloat = (value: string) => {
	const intValue = parseFloat(value);
	return !isNaN(intValue)
		? intValue
		: throwExp(`Terminal-typer effect value '${value}' is invalid`);
};
