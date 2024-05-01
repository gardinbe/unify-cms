const ESCAPE_REGEX_PATTERN = /[/\-\\^$*+?.()|[\]{}]/g;

/**
 * Escapes any Regex control characters within a string.
 * - This does **not** double-escape - use `String.raw`.
 * @param str - Target string
 * @returns Escaped string
 */
export const escapeRegex = (str: string) =>
	str.replace(ESCAPE_REGEX_PATTERN, String.raw`\$&`);
