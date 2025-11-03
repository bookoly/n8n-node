import { resolutionOptions, voiceOptions } from './static';
import { NodePropertyTypes } from 'n8n-workflow';
import { DurationBasis, ResourceType, SubtitleFileType, VideoResolution, Voice } from '../types';

export const getNameParam = (
	operation: string | string[],
	resource?: string,
	description: string = 'Name',
) => {
	let resourceName = '';

	switch (resource) {
		case ResourceType.VIDEO:
			resourceName = 'Video - ';
			break;
		case ResourceType.FILE:
			resourceName = 'Subtitle File - ';
			break;
		case ResourceType.SOUND:
			resourceName = 'Sound - ';
			break;
		case ResourceType.SPEECH:
			resourceName = 'Speech Synthesis - ';
			break;
		case ResourceType.SPEECH_DIALOGUE:
			resourceName = 'Speech Dialogue - ';
			break;
		case ResourceType.TRANSCRIPT:
			resourceName = 'Transcript - ';
			break;
	}

	return {
		displayName: resourceName + 'Name',
		name: 'name',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		description,
		displayOptions: {
			show: {
				...(resource ? { resource: [resource] } : {}),
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
	};
};

export const getUrlParam = (
	operation: string | string[],
	resource?: string,
	displayName: string = 'Video - URL',
) => ({
	displayName: displayName,
	name: 'url',
	type: 'string' as NodePropertyTypes,
	required: true,
	default: '',
	description: 'The public and downloadable URL of the video file',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getSubtitleUrlParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Subtitle File - URL',
	name: 'subtitle_url',
	type: 'string' as NodePropertyTypes,
	required: true,
	default: '',
	description: 'The public and downloadable URL of the subtitle file',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getWebhookUrlParam = (
	operation: string | string[],
	resource?: string,
	description = 'Enter a valid URL to receive webhook notifications.',
) => ({
	displayName: 'Webhook URL',
	name: 'webhook_url',
	type: 'string' as NodePropertyTypes,
	default: '',
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getVoiceParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Speech Synthesis - Voice',
	name: 'vendor_id',
	type: 'options' as NodePropertyTypes,
	required: resource === ResourceType.SPEECH,
	default: resource === ResourceType.SPEECH ? Voice.ECHO : Voice.NONE,
	description: 'The name of the voice',
	options: voiceOptions,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getWaitParam = (
	operation: string | string[],
	resource?: string,
	description: string = 'If enabled, the node pauses the workflow and checks the server until the resource generation is finished, then returns the full resource object. If disabled, only the ID and creation timestamp are returned.',
) => ({
	displayName: 'Wait for Completion',
	name: 'wait',
	type: 'boolean' as NodePropertyTypes,
	default: true,
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getTypeParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Subtitle File - Type',
	name: 'type',
	type: 'options' as NodePropertyTypes,
	default: SubtitleFileType.ASS,
	options: [{ name: 'Advanced SubStation Alpha (ASS)', value: SubtitleFileType.ASS }],
	description: 'Choose the format for your subtitle. ASS is selected by default.',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getTextParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Speech Synthesis - Text',
	name: 'text',
	type: 'string' as NodePropertyTypes,
	required: resource === ResourceType.SPEECH,
	typeOptions: {
		rows: 4,
	},
	default: '',
	description: 'The text to create the speech synthesis from',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getIdParam = (
	operation: string | string[],
	resource: string,
	name: string,
	displayName: string,
	description: string,
) => ({
	displayName,
	name,
	type: 'string' as NodePropertyTypes,
	required: true,
	default: '',
	description,
	displayOptions: {
		show: {
			resource: [resource],
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getResolutionParam = (
	operation: string | string[],
	resource?: string,
	required: boolean = true,
	description: string = 'The resolution of the video',
) => ({
	displayName: 'Video - Resolution',
	name: 'resolution',
	type: 'options' as NodePropertyTypes,
	required,
	default: VideoResolution.HORIZONTAL_HD,
	description,
	options: resolutionOptions,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getDurationBasisParam = (
	operation: string | string[],
	resource?: string,
	required: boolean = true,
	description: string = 'Select how the final video duration will be determined',
) => ({
	displayName: 'Video - Duration',
	name: 'duration_basis',
	type: 'options' as NodePropertyTypes,
	required,
	default: DurationBasis.VIDEO,
	description,
	options: [
		{
			name: 'Audio',
			value: DurationBasis.AUDIO,
			description: 'Use the duration of the audio',
		},
		{
			name: 'Speech Synthesis',
			value: DurationBasis.SPEECH,
			description: 'Use the duration of the speech synthesis',
		},
		{
			name: 'Video',
			value: DurationBasis.VIDEO,
			description: 'Use the duration of all scenes',
		},
	],
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getMuteParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Video - Mute',
	name: 'mute',
	type: 'boolean' as NodePropertyTypes,
	default: false,
	description: 'Whether to mute the original video audio',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getSecParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Video - Timestamp (Seconds)',
	name: 'seconds',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description:
		'The point in time (in seconds) from which the frame should be captured. For example: 5.2 means 5.2 seconds into the video.',
	typeOptions: {
		minValue: 0,
		numberPrecision: 2,
	},
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getRotateParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Video - Rotation (Degrees)',
	name: 'rotation_degrees',
	type: 'options' as NodePropertyTypes,
	default: 90,
	description:
		'The angle of rotation in degrees. Positive values rotate clockwise, negative values rotate counter-clockwise.',
	options: [
		{ name: '90', value: 90 },
		{ name: '180', value: 180 },
		{ name: '270', value: 270 },
	],
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});
