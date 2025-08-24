import {
	getNameParam,
	getTypeParam,
	getUrlParam,
	getWebhookUrlParam,
	getIdParam,
	getWaitParam,
} from './commonParams';
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
					action: 'Generate a subtitle file',
					description: 'Generate subtitle files in multiple formats from a video or audio URL',
				},
				{
					name: 'Get a Specific Subtitle File',
					value: 'getSubtitleFile',
					action: 'Get a subtitle file',
					description: 'Fetches subtitle file data from the API using the subtitle file ID',
				},
			],
			default: 'generateSubtitleFile',
		},
	],
	parameters: [
		getNameParam('generateSubtitleFile', BookolyResourceType.File, 'The name of the subtitle file'),
		getUrlParam(
			'generateSubtitleFile',
			BookolyResourceType.File,
			true,
			'Paste the public and downloadable URL of the video or audio file you want to subtitle',
			'URL',
		),
		getTypeParam('generateSubtitleFile', BookolyResourceType.File),
		...getSubtitleParameters('generateSubtitleFile'),
		getIdParam(
			'getSubtitleFile',
			BookolyResourceType.File,
			'subtitleFileId',
			'Subtitle File ID',
			'The ID of the Subtitle File',
		),
		getWaitParam(
			'generateSubtitleFile',
			BookolyResourceType.File,
			'If enabled, the node will poll the server until the subtitle file is generated and then return the full subtitle file object instead of just the creation response',
		),
		getWebhookUrlParam(
			'generateSubtitleFile',
			BookolyResourceType.File,
			'webhook_url',
			'Enter a valid URL to receive webhook notifications. Subtitle File ID and URL will be included.',
		),
	],
};
