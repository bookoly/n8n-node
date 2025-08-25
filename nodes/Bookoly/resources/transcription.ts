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
					description:
						'Transcribe your audio or video files into clear, accurate text with timestamps',
				},
				{
					name: 'Get a Specific Transcription',
					value: 'getTranscript',
					action: 'Get a transcription',
					description: 'Fetches transcript data from the API using the transcript ID',
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
					operation: ['getTranscript'],
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
			description: 'Choose the primary language spoken in your audio or video file',
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
			default: '',
			description: 'Optionally, translate the transcript into a different language if required',
			options: translationLanguageOptions,
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
			default: true,
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
			description:
				'If enabled, the node pauses the workflow and checks the server until the transcript generation is finished, then returns the full transcript object. If disabled, only the ID and creation timestamp are returned.',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string',
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Transcript ID and URL will be included.',
			displayOptions: {
				show: {
					operation: ['createTranscription'],
					resource: [BookolyResourceType.Transcription],
				},
			},
		},
	],
};
