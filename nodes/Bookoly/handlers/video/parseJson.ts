export function parseJson(input: any, fieldName: string) {
	try {
		if (typeof input === 'object') {
			return input;
		} else if (typeof input === 'string') {
			return JSON.parse(input);
		}
	} catch (exception) {
		throw new Error(`Field ${fieldName} needs to be valid JSON`);
	}

	throw new Error(`Unsupported type ${typeof input} for field scenes`);
}
