import { NodePropertyTypes } from 'n8n-workflow';
import { ResourceDefinition, ResourceType, TranscriptAction } from '../types';
import { languageOptions, translationLanguageOptions } from './static';

export const transcriptionResource: ResourceDefinition = {
	displayName: 'Transcription',
	value: ResourceType.TRANSCRIPT,
	description: 'Manage transcription operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.TRANSCRIPT],
				},
			},
			options: [
				{
					name: 'Transcribe Audio or Video',
					value: TranscriptAction.CREATE_TRANSCRIPT,
					action: 'Transcribe audio or video',
					description:
						'Transcribe your audio or video files into clear, accurate text with timestamps',
				},
				{
					name: 'Get a Specific Transcription',
					value: TranscriptAction.GET_TRANSCRIPT,
					action: 'Get a transcription',
					description: 'Fetches transcript data from the API using the transcript ID',
				},
			],
			default: 'createTranscript',
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
					operation: [TranscriptAction.GET_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
				},
			},
		},
		{
			displayName: 'Transcript - Name',
			name: 'name',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the transcript',
			displayOptions: {
				show: {
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
				},
			},
		},
		{
			displayName: 'Transcript - URL',
			name: 'src',
			type: 'string',
			required: true,
			default: '',
			description: 'The public and downloadable URL of the audio or video file',
			displayOptions: {
				show: {
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
				},
			},
		},
		{
			displayName: 'Transcript - Language',
			name: 'language',
			type: 'options',
			required: true,
			default: 'en',
			description: 'Choose the primary language spoken in your audio or video file',
			options: languageOptions,
			displayOptions: {
				show: {
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
				},
			},
		},
		{
			displayName: 'Transcript - Translation Language',
			name: 'translationLanguage',
			type: 'options',
			default: '',
			description: 'Optionally, translate the transcript into a different language if required',
			options: translationLanguageOptions,
			displayOptions: {
				show: {
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
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
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
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
					operation: [TranscriptAction.CREATE_TRANSCRIPT],
					resource: [ResourceType.TRANSCRIPT],
				},
			},
		},
	],
};
