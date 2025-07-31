import { NodePropertyTypes } from 'n8n-workflow';
import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { languageOptions, subtitleStyleOptions, fontFamilyOptions, positionOptions } from './static';

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
		{
			displayName: 'Style',
			name: 'style',
			type: 'options',
			default: 'simple',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			options: subtitleStyleOptions,
			description: 'Select a subtitle style. The default is "Highlight Current Word".',
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'options',
			default: 'en',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			options: languageOptions,
			description: 'Select the language for subtitles',
		},
		{
			displayName: 'Font Family',
			name: 'font_family',
			type: 'options',
			default: 'Arial',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			options: fontFamilyOptions,
			description: 'The default subtitle font family is Arial',
		},
		{
			displayName: 'Font Size',
			name: 'font_size',
			type: 'number',
			default: 20,
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'The default subtitle font size is 20',
		},
		{
			displayName: 'Word Color',
			name: 'word_color',
			type: 'color',
			default: '#FEEE15',
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'The subtitle word color given in Hex e.g. #FEEE15 = Yellow',
		},
		{
			displayName: 'Line Color',
			name: 'line_color',
			type: 'color',
			default: '#FFFFFF',
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'The subtitle line color given in Hex e.g. #FFFFFF = White',
		},
		{
			displayName: 'Line Words',
			name: 'line_words',
			type: 'number',
			default: 4,
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'Defines how many words are displayed at a time. Min. = 1, Max. = 10',
		},
		{
			displayName: 'Outline Width',
			name: 'outline_width',
			type: 'number',
			default: 5,
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'The default subtitle outline width is 5',
		},
		{
			displayName: 'Position',
			name: 'position',
			type: 'options',
			default: 'top_left',
			required: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			options: positionOptions,
			description: 'Position of the subtitle on the video',
		},
		{
			displayName: 'Orientation',
			name: 'ltr',
			type: 'boolean',
			default: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.File],
					operation: ['generateSubtitleFile'],
				},
			},
			description: 'Whether text flows left-to-right (LTR) or right-to-left (RTL)',
		},
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
