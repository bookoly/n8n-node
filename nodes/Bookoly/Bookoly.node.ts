
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
import { BookolyResourceType } from './types';

export class Bookoly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bookoly',
		name: 'bookoly',
		icon: 'file:bookoly.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bookoly API',
		defaults: {
			name: 'Bookoly',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		requestDefaults: {
			baseURL: 'https://bookoly.com/api/v1/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
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
			...Object.values(RESOURCE_DEFINITIONS).flatMap(resource => [
				...resource.operations,
				...resource.parameters,
			]),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as BookolyResourceType;
			const operation = this.getNodeParameter('operation', i) as string;

			const handler = HANDLERS[resource]?.[operation];
			if (!handler) {
				throw new NodeOperationError(
					this.getNode(),
					`No handler found for ${resource}.${operation}`,
				);
			}

			try {
				const result = await handler(this, i);
				returnData.push({ json: result });
			} catch (error) {
				if (error.name === 'NodeOperationError') {
					throw error;
				}
				throw new NodeOperationError(this.getNode(), `Failed to execute ${operation}: ${error.message}`);
			}
		}

		return [returnData];
	}
} 