import { voiceOptions, resolutionOptions } from './static';
import { NodePropertyTypes } from 'n8n-workflow';

// Name parameter
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

// URL parameter
export const getUrlParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The URL',
	displayName = 'Video URL',
) => ({
	displayName: displayName,
	name: 'url',
	type: 'string' as NodePropertyTypes,
	required,
	default: '',
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});
export const getSubtitleUrlParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The URL',
) => ({
	displayName: 'Subtitle URL',
	name: 'subtitle_url',
	type: 'string' as NodePropertyTypes,
	required,
	default: '',
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

// Webhook URL parameter
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

// Voice parameter
export const getVoiceParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The name of the voice',
) => ({
	displayName: 'Voice',
	name: 'vendor_id',
	type: 'options' as NodePropertyTypes,
	required,
	default: '',
	description,
	options: voiceOptions,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

// Wait for Completion parameter
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

// Type parameter (for subtitle file type)
export const getTypeParam = (
	operation: string | string[],
	resource?: string,
	options = [{ name: 'Advanced SubStation Alpha (ASS)', value: 'ass' }],
	description = 'Choose the format for your subtitle. ASS is selected by default.',
) => ({
	displayName: 'Type',
	name: 'type',
	type: 'options' as NodePropertyTypes,
	default: 'ass',
	options,
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

// Text parameter
export const getTextParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The text to create the speech synthesis from',
) => ({
	displayName: 'Text',
	name: 'text',
	type: 'string' as NodePropertyTypes,
	required,
	default: '',
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

// ID parameter (generic, e.g. Speech ID, Subtitle File ID, Video ID)
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

// Volume parameter
export const getVolumeParam = (
	operation: string | string[],
	resource?: string,
	description = 'Set audio volume from 0% to 100%. 100% is the original volume, and 50% is half the original volume.',
) => ({
	displayName: 'Volume',
	name: 'volume',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});

// Resolution parameter
export const getResolutionParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The resolution of your video',
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

//Mute option
export const getMuteParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The resolution of your video',
) => ({
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
export const getSecParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The point in time (in seconds) from which the frame should be captured. For example: 5.2 means 5.2 seconds into the video.',
) => ({
	displayName: 'Timestamp (Seconds)',
	name: 'seconds',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description,
	displayOptions: {
		show: {
			...(resource ? { resource: [resource] } : {}),
			operation: Array.isArray(operation) ? operation : [operation],
		},
	},
});
export const getRotateParam = (
	operation: string | string[],
	resource?: string,
	required = true,
	description = 'The angle of rotation in degrees. Positive values rotate clockwise, negative values rotate counter-clockwise.',
) => ({
	displayName: 'Rotation (Degrees)',
	name: 'rotation_degrees',
	type: 'options' as NodePropertyTypes,
	default: 90,
	description,
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
