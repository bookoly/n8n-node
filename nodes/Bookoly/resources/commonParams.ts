import { voiceOptions, resolutionOptions } from './static';
import { NodePropertyTypes } from 'n8n-workflow';

export const getNameParam = (
	operation: string | string[],
	resource?: string,
	description = 'The name',
) => ({
	displayName: 'Name',
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
});

export const getUrlParam = (
	operation: string | string[],
	resource?: string,
	displayName = 'Video URL',
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
	displayName: 'Subtitle URL',
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
	name = 'webhook_url',
	description = 'Enter a valid URL to receive webhook notifications.',
) => ({
	displayName: 'Webhook URL',
	name,
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
	displayName: 'Voice',
	name: 'vendor_id',
	type: 'options' as NodePropertyTypes,
	required: true,
	default: '',
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
	description = 'If enabled, the node pauses the workflow and checks the server until the resource generation is finished, then returns the full resource object. If disabled, only the ID and creation timestamp are returned.',
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
	displayName: 'Type',
	name: 'type',
	type: 'options' as NodePropertyTypes,
	default: 'ass',
	options: [{ name: 'Advanced SubStation Alpha (ASS)', value: 'ass' }],
	description: 'Choose the format for your subtitle. ASS is selected by default.',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getTextParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Text',
	name: 'text',
	type: 'string' as NodePropertyTypes,
	required: true,
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
	required = true,
	description = 'The resolution of the video',
) => ({
	displayName: 'Resolution',
	name: 'resolution',
	type: 'options' as NodePropertyTypes,
	required,
	default: 'horizontal_hd',
	description,
	options: resolutionOptions,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getMuteParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Mute Video',
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
	displayName: 'Timestamp (Seconds)',
	name: 'seconds',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description:
		'The point in time (in seconds) from which the frame should be captured. For example: 5.2 means 5.2 seconds into the video.',
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

export const getRotateParam = (operation: string | string[], resource?: string) => ({
	displayName: 'Rotation (Degrees)',
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
