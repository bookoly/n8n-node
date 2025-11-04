import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodePropertyTypes,
	IExecuteFunctions,
	NodeOperationError,
} from 'n8n-workflow';

import { RESOURCE_DEFINITIONS } from './resources';
import { HANDLERS } from './handlers';
import { ResourceType } from './types';

export const APP_BASE_URL = 'https://bookoly.com/app';
export const API_BASE_URL = 'https://bookoly.com/api';

export class Bookoly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'bookoly',
		name: 'bookoly',
		icon: 'file:bookoly.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the bookoly API',
		defaults: {
			name: 'bookoly',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bookolyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options' as NodePropertyTypes,
				noDataExpression: true,
				options: Object.values(RESOURCE_DEFINITIONS).map(({ displayName, value }) => ({
					name: displayName,
					value: value,
				})),
				default: Object.values(RESOURCE_DEFINITIONS)[0].value,
			},
			...Object.values(RESOURCE_DEFINITIONS).flatMap((resource) => [
				...resource.operations,
				...resource.parameters,
			]),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const items: INodeExecutionData[] = this.getInputData();

		for (let i: number = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as ResourceType;
			const operation = this.getNodeParameter('operation', i) as string;

			const handler: Function = HANDLERS[resource]?.[operation];
			if (!handler) {
				throw new NodeOperationError(
					this.getNode(),
					`No handler found for ${resource}.${operation}`,
				);
			}

			const continueOnFail = this.continueOnFail();
			try {
				const result: any = await handler(this, i);
				returnData.push({ json: result, pairedItem: { item: i } });
			} catch (error) {
				if (continueOnFail) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
