import { ResourceDefinition, ResourceType, SoundAction } from '../types';

export const soundResource: ResourceDefinition = {
	displayName: 'Sound',
	value: ResourceType.SOUND,
	description: 'Manage sound operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.SOUND],
				},
			},
			options: [
				{
					name: 'Combine Sounds',
					value: SoundAction.COMBINE_SOUNDS,
					action: 'Combine sounds',
					description: 'Merge multiple sound files into a single seamless audio track',
				},
				{
					name: 'Get a Specific Sound',
					value: SoundAction.GET_SOUND,
					action: 'Get a sound',
					description: 'Fetches sound data from the API using the sound ID',
				},
			],
			default: 'combineSounds',
		},
	],
	parameters: [
		{
			displayName: 'Sound ID',
			name: 'soundId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					operation: [SoundAction.GET_SOUND],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description: 'The ID of the sound',
		},
		{
			displayName: 'Sound - Name',
			name: 'name',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					operation: [SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description: 'The name of the sound',
		},
		{
			displayName: 'Sound - Sounds (JSON)',
			name: 'segments',
			type: 'json',
			displayOptions: {
				show: { operation: [SoundAction.COMBINE_SOUNDS], resource: [ResourceType.SOUND] },
			},
			default:
				'[\n' +
				'  {\n' +
				'    "src": ""\n' +
				'  },\n' +
				'  {\n' +
				'    "src": ""\n' +
				'  }\n' +
				']',
			description: "Enter the all the public and downloadable URL's of your audio files here",
		},
		{
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean',
			default: true,
			displayOptions: {
				show: {
					operation: [SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			description:
				'Whether the node pauses the workflow and checks the server until the sound generation is finished, then returns the full sound object. If disabled, only the ID and creation timestamp are returned.',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string',
			displayOptions: {
				show: {
					operation: [SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Sound ID and URL will be included.',
		},
	],
};
