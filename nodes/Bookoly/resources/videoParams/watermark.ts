import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const watermarkUrlParam = {
	displayName: 'Watermark URL',
	name: 'watermark_url',
	type: 'string' as NodePropertyTypes,
	default: '',
	description: 'The public and downloadable URL of the image file (e.g., PNG or JPG)',
	required: true,
	displayOptions: {
		show: {
			operation: [VideoAction.ADD_WATERMARK_TO_VIDEO],
		},
	},
};

export const watermarkPositionParam = {
	displayName: 'Watermark Position',
	name: 'watermarkPosition',
	type: 'fixedCollection' as NodePropertyTypes,
	default: {},
	description: 'Set the absolute position of the watermark from the top-left corner of the video',
	displayOptions: {
		show: {
			operation: [VideoAction.ADD_WATERMARK_TO_VIDEO],
		},
	},
	options: [
		{
			displayName: 'Position',
			name: 'position',
			values: [
				{
					displayName: 'X Coordinate',
					name: 'x',
					type: 'number' as NodePropertyTypes,
					default: 0,
					description: 'Distance in pixels from the left edge of the video',
					required: true,
				},
				{
					displayName: 'Y Coordinate',
					name: 'y',
					type: 'number' as NodePropertyTypes,
					default: 0,
					description: 'Distance in pixels from the top edge of the video',
					required: true,
				},
			],
		},
	],
};
