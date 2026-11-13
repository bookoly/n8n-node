import { INode, NodeOperationError } from 'n8n-workflow';

export function parseJson(node: INode, input: any, fieldName: string) {
	try {
		if (typeof input === 'object') {
			return input;
		} else if (typeof input === 'string') {
			return JSON.parse(input);
		}
	} catch (exception) {
		throw new NodeOperationError(node, `Field ${fieldName} needs to be valid JSON`);
	}

	throw new NodeOperationError(node, `Unsupported type ${typeof input} for field ${fieldName}`);
}
