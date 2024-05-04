/**
 * Capitalizes the first character of a string.
 * @param str - String
 * @returns Capitalized string
 */
export const capitalize = (str: string) =>
	str.charAt(0).toLocaleUpperCase() + str.slice(1);
