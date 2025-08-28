import { INodeProperties } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const blurOptionParam: INodeProperties[] = [
	{
		displayName: 'X Coordinate',
		name: 'x',
		type: 'number',
		default: 0,
		description: 'Horizontal position of the top-left corner of the blur area',
		required: true,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: [VideoAction.BLUR_VIDEO],
			},
		},
	},
	{
		displayName: 'Y Coordinate',
		name: 'y',
		type: 'number',
		default: 0,
		description: 'Vertical position of the top-left corner of the blur area',
		required: true,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: [VideoAction.BLUR_VIDEO],
			},
		},
	},
	{
		displayName: 'Box Width',
		name: 'box_width',
		type: 'number',
		default: 5,
		description: 'Width of the blur box in pixels. Must not exceed the video width.',
		required: true,
		typeOptions: {
			minValue: 5,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: [VideoAction.BLUR_VIDEO],
			},
		},
	},
	{
		displayName: 'Box Height',
		name: 'box_height',
		type: 'number',
		default: 5,
		description: 'Height of the blur box in pixels. Must not exceed the video height.',
		required: true,
		typeOptions: {
			minValue: 5,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: [VideoAction.BLUR_VIDEO],
			},
		},
	},
	{
		displayName: 'Power',
		name: 'power',
		type: 'number',
		default: 10,
		description:
			'Controls the intensity of the blur. Higher values produce stronger blur. Recommended range: 10 to 25.',
		required: true,
		typeOptions: {
			maxValue: 100,
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: [VideoAction.BLUR_VIDEO],
			},
		},
	},
];
