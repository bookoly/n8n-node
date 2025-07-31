import { NodePropertyTypes } from 'n8n-workflow';
import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { voiceOptions } from './static';

export const speechResource: BookolyResourceDefinition = {
	displayName: 'Speech',
	value: BookolyResourceType.Speech,
	description: 'Manage speech operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.Speech],
				},
			},
			options: [
				{
					name: 'Create a Speech Synthesis',
					value: 'createSpeech',
					action: 'Create a new speech',
					description: 'Synthesizes a text into speech',
				},
				{
					name: 'Wait for Speech Generation',
					value: 'waitForSpeech',
					action: 'Get a speech',
					description: 'Pauses the workflow until the speech generation process is finished',
				},
			],
			default: 'createSpeech',
		},
	],
	parameters: [
		{
			displayName: 'Speech ID',
			name: 'speechId',
			type: 'string',
			required: true,
			default: '',
			description: 'The ID of the Speech',
			displayOptions: {
				show: {
					operation: ['waitForSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the speech synthesis',
			displayOptions: {
				show: {
					operation: ['createSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
		},
		{
			displayName: 'Text',
			name: 'text',
			type: 'string',
			required: true,
			default: '',
			description: 'The text to create the speech synthesis from',
			displayOptions: {
				show: {
					operation: ['createSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
		},
		{
			displayName: 'Webhook URL',
			name: 'webhookUrl',
			type: 'string',
			default: '',
			description: 'Enter a valid URL to receive webhook notifications. Speech ID and URL will be included.',
			displayOptions: {
				show: {
					operation: ['createSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
		},
		{
			displayName: 'Voice',
			name: 'vendor_id',
			type: 'options',
			required: true,
			default: '',
			description: 'The name of the voice',
			options: voiceOptions,
			displayOptions: {
				show: {
					operation: ['createSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
		},
		// Wait toggle (visible only for the two POST operations)
		{
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean' as NodePropertyTypes,
			default: false,
			displayOptions: {
				show: {
					operation: ['createSpeech'],
					resource: [BookolyResourceType.Speech],
				},
			},
			description: 'If enabled, the node will poll the server until the speech is finished and then return the full speech object instead of just the creation response',
		},
	],
};