export function parseScenes(scenes: any) {
	try {
		if (typeof scenes === 'object') {
			return scenes;
		} else if (typeof scenes === 'string') {
			return JSON.parse(scenes);
		}
	} catch (exception) {
		throw new Error('Field scenes needs to be a valid JSON');
	}

	throw new Error(`Unsupported type ${typeof scenes} for field scenes`);
}
