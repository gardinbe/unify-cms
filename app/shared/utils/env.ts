/**
 * Object with functions to parse environment variables.
 */
export const env = {
	/**
	 * Parses and resolves an environment variable as a string.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	str(value: string | undefined) {
		return value || null;
	},

	/**
	 * Parses and resolves an environment variable as a boolean.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	bool(value: string | undefined) {
		if (value === 'true')
			return true;

		if (value === 'false')
			return false;

		return null;
	},

	/**
	 * Parses and resolves an environment variable as a float.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	int(value: string | undefined) {
		if (!value)
			return null;

		const parsedValue = parseInt(value);
		if (!Number.isInteger(parsedValue)) //includes NaN check
			return null;

		return parsedValue;
	},

	/**
	 * Parses and resolves an environment variable as a float.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	float(value: string | undefined) {
		if (!value)
			return null;

		const parsedValue = parseFloat(value);
		if (isNaN(parsedValue))
			return null;

		return parsedValue;
	}
} as const;
