/**
 * Object with methods to parse environment variables.
 */
export const parseEnv = {
	/**
	 * Parses an environment variable value as a boolean.
	 * @param value - Environment variable value
	 * @returns Boolean
	 */
	bool(value: string | undefined) {
		if (value === 'true')
			return true;

		if (value === 'false')
			return false;

		return null;
	},

	/**
	 * Parses an environment variable value as a float.
	 * @param value - Environment variable value
	 * @returns Integer
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
	 * Parses an environment variable value as a float.
	 * @param value - Environment variable value
	 * @returns Float
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
