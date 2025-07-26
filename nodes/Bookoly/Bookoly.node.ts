import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
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
				Accept: 'text/html,application/json',
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
				type: 'options',
				noDataExpression: true,
				options: Object.values(BookolyResourceType).map(value => ({
					name: value,
					value: value,
				})),
				default: '',
			},
		]
	};

} 