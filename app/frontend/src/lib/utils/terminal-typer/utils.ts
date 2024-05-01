import { throwExp } from '~/lib/utils';

/**
 * Converts a string to an integer.
 * @param value - Target value
 * @returns Integer value
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
 * @param value - Target value
 * @returns Float value
 * @throws Error if conversion failed
 */
export const strToFloat = (value: string) => {
	const intValue = parseFloat(value);
	return !isNaN(intValue)
		? intValue
		: throwExp(`Terminal-typer effect value '${value}' is invalid`);
};
