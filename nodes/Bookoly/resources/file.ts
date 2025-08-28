import {
	getIdParam,
	getNameParam,
	getTypeParam,
	getUrlParam,
	getWaitParam,
	getWebhookUrlParam,
} from './commonParams';
import { ResourceDefinition, ResourceType, SubtitleFileAction } from '../types';
import { getSubtitleParameters } from './subtitleParams';

export const fileResource: ResourceDefinition = {
	displayName: 'File',
	value: ResourceType.FILE,
	description: 'Manage file operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.FILE],
				},
			},
			options: [
				{
					name: 'Generate a Subtitle File',
					value: SubtitleFileAction.GENERATE_SUBTITLE_FILE,
					action: 'Generate a subtitle file',
					description: 'Generate subtitle files in multiple formats from a video or audio URL',
				},
				{
					name: 'Get a Specific Subtitle File',
					value: SubtitleFileAction.GET_SUBTITLE_FILE,
					action: 'Get a subtitle file',
					description: 'Fetches subtitle file data from the API using the subtitle file ID',
				},
			],
			default: 'generateSubtitleFile',
		},
	],
	parameters: [
		getNameParam(
			SubtitleFileAction.GENERATE_SUBTITLE_FILE,
			ResourceType.FILE,
			'The name of the subtitle file',
		),
		getUrlParam(SubtitleFileAction.GENERATE_SUBTITLE_FILE, ResourceType.FILE, 'URL'),
		getTypeParam(SubtitleFileAction.GENERATE_SUBTITLE_FILE, ResourceType.FILE),
		...getSubtitleParameters(SubtitleFileAction.GENERATE_SUBTITLE_FILE),
		getIdParam(
			SubtitleFileAction.GET_SUBTITLE_FILE,
			ResourceType.FILE,
			'subtitleFileId',
			'Subtitle File ID',
			'The ID of the Subtitle File',
		),
		getWaitParam(
			SubtitleFileAction.GENERATE_SUBTITLE_FILE,
			ResourceType.FILE,
			'If enabled, the node pauses the workflow and checks the server until the subtitle file generation is finished, then returns the full subtitle file object. If disabled, only the ID and creation timestamp are returned.',
		),
		getWebhookUrlParam(
			SubtitleFileAction.GENERATE_SUBTITLE_FILE,
			ResourceType.FILE,
			'Enter a valid URL to receive webhook notifications. Subtitle File ID and URL will be included.',
		),
	],
};
