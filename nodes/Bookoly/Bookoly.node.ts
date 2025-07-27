
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodePropertyTypes,
	IExecuteFunctions,
	NodeOperationError,
} from 'n8n-workflow';
import { BookolyResourceType } from './types';

// import {
// 	OptionsWithUri,
// } from 'request';
import { RESOURCE_DEFINITIONS } from './resources';

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
			// Add both operations and parameters
			...Object.values(RESOURCE_DEFINITIONS).flatMap(resource => [
				...resource.operations,
				...resource.parameters,
			]),
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const baseURL = 'https://bookoly.com/api/v1/';

		const waitForSound = async (soundId: string): Promise<any> => {
			const maxAttempts = 60;
			const delayMs = 2000;
			for (let attempt = 0; attempt < maxAttempts; attempt++) {
				const res = await this.helpers.httpRequest({
					method: 'GET',
					url: `${baseURL}sounds/${soundId}`,
				});
				if (res?.sound?.status === 'finished' || res?.sound?.status === 'ready') {
					return res;
				}
				await new Promise(resolve => setTimeout(resolve, delayMs));
			}
			throw new NodeOperationError(this.getNode(), 'Timeout while waiting for sound generation to finish');
		};

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			if (resource === BookolyResourceType.Sound) {
				if (operation === 'createSoundEffect') {
					const body = {
						sound: {
							name: this.getNodeParameter('name', i) as string,
							webhook_url: this.getNodeParameter('webhook_url', i, '') as string,
							effect_text: this.getNodeParameter('effect_text', i) as string,
							effect_duration: this.getNodeParameter('effect_duration', i, 0.5) as number,
						},
					};

					const response = await this.helpers.httpRequest({
						method: 'POST',
						url: `${baseURL}create-sound-effect`,
						body,
					});

					const wait = this.getNodeParameter('wait', i, false) as boolean;
					let finalResponse = response;
					if (wait && response?.sound?.id) {
						finalResponse = await waitForSound(response.sound.id);
					}

					returnData.push({ json: finalResponse });
					continue;
				}

				if (operation === 'combineSounds') {
					const segments = ((this.getNodeParameter('segmentList', i) as any).segmentValues || []) as Array<{ src: string }>;
					const body = {
						sound: {
							name: this.getNodeParameter('name', i) as string,
							webhook_url: this.getNodeParameter('webhook_url', i, '') as string,
							segments: segments.map(s => ({ src: s.src })),
						},
					};

					const response = await this.helpers.httpRequest({
						method: 'POST',
						url: `${baseURL}combine-sounds`,
						body,
					});

					const wait = this.getNodeParameter('wait', i, false) as boolean;
					let finalResponse = response;
					if (wait && response?.sound?.id) {
						finalResponse = await waitForSound(response.sound.id);
					}

					returnData.push({ json: finalResponse });
					continue;
				}

				if (operation === 'waitForSound') {
					const soundId = this.getNodeParameter('soundId', i) as string;
					const result = await waitForSound(soundId);
					returnData.push({ json: result });
					continue;
				}
			}

			// If operation/resource not matched, push input as-is
			returnData.push(items[i]);
		}

		return [returnData];
	}
} 