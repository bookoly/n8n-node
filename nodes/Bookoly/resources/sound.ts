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
				// routing removed; handled in execute()
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
			displayOptions: {
				show: {
					operation: [SoundAction.CREATE_SOUND_EFFECT],
					resource: [ResourceType.SOUND],
				},
			},
			default: 1,
			description:
				'The duration of the sound which will be generated in seconds. Must be at least 0.5 and at most 22. We will guess the optimal duration using the text if the duration is not set',
			typeOptions: {
				minValue: 0.5,
				maxValue: 22,
			},
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
			displayName: 'Segments',
			name: 'segmentList',
			type: 'fixedCollection' as NodePropertyTypes,
			typeOptions: {
				multipleValues: true,
				sortable: true,
				addButtonText: 'Add Segment',
			},
			displayOptions: {
				show: {
					operation: [SoundAction.COMBINE_SOUNDS],
					resource: [ResourceType.SOUND],
				},
			},
			default: { segmentValues: [{ src: '' }] },
			options: [
				{
					name: 'segmentValues',
					displayName: 'URL',
					values: [
						{
							displayName: 'URL',
							name: 'src',
							type: 'string' as NodePropertyTypes,
							default: '',
							description: 'List the segments of your sound here',
							required: true,
						},
					],
				},
			],
			description: 'List the segments of your sound here',
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
