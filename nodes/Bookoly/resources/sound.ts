import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { NodePropertyTypes } from 'n8n-workflow';

export const soundResource: BookolyResourceDefinition = {
	displayName: 'Sound',
	value: BookolyResourceType.Sound,
	description: 'Manage sound operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options' as NodePropertyTypes,
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.Sound],
				},
			},
			options: [
				{
					name: 'Combine Sounds',
					value: 'combineSounds',
					action: 'Combine sounds',
					description: 'Merge multiple sound files into a single seamless audio track',
					// routing removed; handled in execute()
				},
				{
					name: 'Create a Sound Effect',
					value: 'createSoundEffect',
					action: 'Create a sound effect',
					description: 'Generate sound effects based on a text description',
					// routing removed; handled in execute()
				},
				{
					name: 'Get a Specific Sound',
					value: 'getSound',
					action: 'Get a sound',
					description: 'Fetches sound data from the API using the sound ID',
					// routing removed; handled in execute()
				},
			],
			default: 'createSoundEffect',
		},
	],
	parameters: [
		// Wait for Sound Generation Parameters
		{
			displayName: 'Sound ID',
			name: 'soundId',
			type: 'string' as NodePropertyTypes,
			required: true,
			displayOptions: {
				show: {
					operation: ['getSound'],
					resource: [BookolyResourceType.Sound],
				},
			},
			default: '',
			description: 'The ID of the sound',
		},

		// Create Sound Effect Parameters
		{
			displayName: 'Name',
			name: 'name',
			type: 'string' as NodePropertyTypes,
			required: true,
			displayOptions: {
				show: {
					operation: ['createSoundEffect'],
					resource: [BookolyResourceType.Sound],
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
					operation: ['createSoundEffect'],
					resource: [BookolyResourceType.Sound],
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
					operation: ['createSoundEffect'],
					resource: [BookolyResourceType.Sound],
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
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string' as NodePropertyTypes,
			displayOptions: {
				show: {
					operation: ['createSoundEffect'],
					resource: [BookolyResourceType.Sound],
				},
			},
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Sound ID and URL will be included.',
		},

		// Combine Sounds Parameters
		{
			displayName: 'Name',
			name: 'name',
			type: 'string' as NodePropertyTypes,
			required: true,
			displayOptions: {
				show: {
					operation: ['combineSounds'],
					resource: [BookolyResourceType.Sound],
				},
			},
			default: '',
			description: 'The name of the sound',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string' as NodePropertyTypes,
			displayOptions: {
				show: {
					operation: ['combineSounds'],
					resource: [BookolyResourceType.Sound],
				},
			},
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Sound ID and URL will be included.',
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
					operation: ['combineSounds'],
					resource: [BookolyResourceType.Sound],
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
							placeholder: 'https://bookoly.com/view/audio/...',
						},
					],
				},
			],
			description: 'List the segments of your sound here',
		},
		// Wait toggle (visible only for the two POST operations)
		{
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean' as NodePropertyTypes,
			default: false,
			displayOptions: {
				show: {
					operation: ['createSoundEffect', 'combineSounds'],
					resource: [BookolyResourceType.Sound],
				},
			},
			description:
				'If enabled, the node pauses the workflow and checks the server until the sound generation is finished, then returns the full sound object. If disabled, only the ID and creation timestamp are returned.',
		},
	],
};
