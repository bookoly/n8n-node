import { ResourceDefinition, ResourceType, SoundAction } from '../types';
import { NodePropertyTypes } from 'n8n-workflow';

export const soundResource: ResourceDefinition = {
	displayName: 'Sound',
	value: ResourceType.SOUND,
	description: 'Manage sound operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options' as NodePropertyTypes,
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
					name: 'Create a Sound Effect',
					value: SoundAction.CREATE_SOUND_EFFECT,
					action: 'Create a sound effect',
					description: 'Generate sound effects based on a text description',
				},
				{
					name: 'Get a Specific Sound',
					value: SoundAction.GET_SOUND,
					action: 'Get a sound',
					description: 'Fetches sound data from the API using the sound ID',
				},
			],
			default: SoundAction.CREATE_SOUND_EFFECT,
		},
	],
	parameters: [
		{
			displayName: 'Sound ID',
			name: 'soundId',
			type: 'string' as NodePropertyTypes,
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
			displayName: 'Name',
			name: 'name',
			type: 'string' as NodePropertyTypes,
			required: true,
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description: 'The name of the sound effect',
		},
		{
			displayName: 'Text',
			name: 'effect_text',
			type: 'string' as NodePropertyTypes,
			required: true,
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description: 'The text that will get converted into a sound effect',
		},
		{
			displayName: 'Effect Duration',
			name: 'effect_duration',
			type: 'number' as NodePropertyTypes,
			typeOptions: {
				minValue: 0.5,
				maxValue: 22,
			},
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT],
					resource: [ResourceType.SOUND],
				},
			},
			default: 1,
			description:
				'The duration of the sound which will be generated in seconds. Must be at least 0.5 and at most 22. We will guess the optimal duration using the text if the duration is not set',
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string' as NodePropertyTypes,
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
			displayName: 'Audio',
			name: 'audioList',
			type: 'fixedCollection' as NodePropertyTypes,
			typeOptions: {
				multipleValues: true,
				sortable: true,
			},
			placeholder: 'Add Audio URL',
			displayOptions: {
				show: {
					operation: [SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			default: { urls: [{ src: '' }, { src: '' }] },
			options: [
				{
					name: 'urls',
					displayName: 'URL',
					values: [
						{
							displayName: 'Audio URL',
							name: 'src',
							type: 'string' as NodePropertyTypes,
							default: '',
							description: 'The public and downloadable URL of the audio file',
							required: true,
						},
					],
				},
			],
			description: "Enter the all the public and downloadable URL's of your audio files here",
		},
		{
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean' as NodePropertyTypes,
			default: true,
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT, SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			description:
				'If enabled, the node pauses the workflow and checks the server until the sound generation is finished, then returns the full sound object. If disabled, only the ID and creation timestamp are returned.',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string' as NodePropertyTypes,
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT, SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Sound ID and URL will be included.',
		},
	],
};
