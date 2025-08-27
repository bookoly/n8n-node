import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const watermarkParams = [
	{
		displayName: 'Watermark - URL',
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
	},
	{
		displayName: 'Watermark - X Coordinate',
		name: 'watermark_point_y',
		type: 'number' as NodePropertyTypes,
		required: true,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		default: 0,
		description: 'Distance in pixels from the left edge of the video',
		displayOptions: {
			show: {
				operation: [VideoAction.ADD_WATERMARK_TO_VIDEO],
			},
		},
	},
	{
		displayName: 'Watermark - Y Coordinate',
		name: 'watermark_point_x',
		type: 'number' as NodePropertyTypes,
		required: true,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		default: 0,
		description: 'Distance in pixels from the top edge of the video',
		displayOptions: {
			show: {
				operation: [VideoAction.ADD_WATERMARK_TO_VIDEO],
			},
		},
	},
];
