import { NodePropertyTypes } from 'n8n-workflow';
import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { getSubtitleParameters } from './subtitleParams';

export const fileResource: BookolyResourceDefinition = {
	displayName: 'File',
	value: BookolyResourceType.File,
	description: 'Manage file operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
				},
			},
			options: [
				{
					name: 'Generate a Subtitle File',
					value: 'generateSubtitleFile',
					action: 'Generate a new subtitle file',
					description: 'Generate subtitle files in multiple formats from a video or audio URL',
				},
				{
					name: 'Wait for Subtitle File Generation',
					value: 'waitForSubtitleFileGeneration',
					action: 'Wait for a subtitle file to be generated',
					description: 'Pause the workflow until the subtitle file generation process is finished',
				},
			],
			default: 'generateSubtitleFile',
		},
	],
	parameters: [
		// Generate Subtitle File parameters
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'The name of the subtitle file',
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			default: 'ass',
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			options: [
				{
					name: 'Advanced SubStation Alpha (ASS)',
					value: 'ass',
				},
			],
			description: 'Choose the format for your subtitle. ASS is selected by default.',
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'Paste the public URL of the video or audio source you want to subtitle',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'Enter a valid URL to receive webhook notifications. Subtitle File ID and URL will be included.',
		},
		// Subtitle parameters for generateSubtitleFile
		...getSubtitleParameters('generateSubtitleFile'),
		// Wait for Subtitle File Generation parameters
		{
			displayName: 'Subtitle File ID',
			name: 'subtitleFileId',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['waitForSubtitleFileGeneration'],
				},
			},
			description: 'The ID of the Subtitle File',
		},
		// Wait toggle (visible only for the two POST operations)
		{
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean' as NodePropertyTypes,
			default: false,
			displayOptions: {
				show: {
					operation: ['generateSubtitleFile'],
					resource: [BookolyResourceType.File],
				},
			},
			description: 'If enabled, the node will poll the server until the subtitle file is generated and then return the full subtitle file object instead of just the creation response',
		},
	],
};
