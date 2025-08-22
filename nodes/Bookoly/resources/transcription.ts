import { NodePropertyTypes } from 'n8n-workflow';
import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { languageOptions, translationLanguageOptions } from './static';

export const transcriptionResource: BookolyResourceDefinition = {
	displayName: 'Transcription',
	value: BookolyResourceType.Transcription,
	description: 'Manage transcription operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.Transcription],
				},
			},
			options: [
				{
					name: 'Transcribe Audio or Video',
					value: 'createTranscription',
					action: 'Transcribe audio or video',
					description: 'Transcribe your audio or video files into clear, accurate text with timestamps',
				},
				{
					name: 'Wait for Transcription Generation',
					value: 'waitForTranscription',
					action: 'Get a transcription',
					description: 'Pauses the workflow until the transcript generation process is finished',
				},
			],
			default: 'createTranscription',
		},
	],
	parameters: [
		{
			displayName: 'Transcript ID',
			name: 'transcriptId',
			type: 'string',
			required: true,
			default: '',
			description: 'The ID of the Transcript',
			displayOptions: {
				show: {
					operation: ['waitForTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the transcript',
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
        {
			displayName: 'URL',
			name: 'src',
			type: 'string',
			required: true,
			default: '',
			description: 'The public and downloadable URL of the audio or video file',
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'options',
			required: true,
			default: 'en',
			description: 'The language of the audio/video file',
			options: languageOptions,
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
		{
			displayName: 'Translation Language',
			name: 'translationLanguage',
			type: 'options',
			default: 'en',
			description: 'The language to translate the transcript to (optional)',
			options: translationLanguageOptions,
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
		{
			displayName: 'Webhook URL',
			name: 'webhookUrl',
			type: 'string',
			default: '',
			description: 'Enter a valid URL to receive webhook notifications. Transcript ID and URL will be included.',
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
        {
			displayName: 'Wait for Completion',
			name: 'wait',
			type: 'boolean' as NodePropertyTypes,
			default: false,
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
			description: 'If enabled, the node will poll the server until the transcript is finished and then return the full transcript object instead of just the creation response',
		},
	],
};
