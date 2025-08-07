import { INodeProperties } from 'n8n-workflow';

export const blurOptionParam: INodeProperties[] = [
	{
		displayName: 'X Coordinate',
		name: 'x',
		type: 'number',
		default: 0,
		description: 'Distance in pixels from the left edge of the video',
		required: true,
		displayOptions: {
			show: {
				operation: ['blurVideo'],
			},
		},
	},
	{
		displayName: 'Y Coordinate',
		name: 'y',
		type: 'number',
		default: 0,
		description: 'Distance in pixels from the top edge of the video',
		required: true,
		displayOptions: {
			show: {
				operation: ['blurVideo'],
			},
		},
	},
	{
		displayName: 'Box Width',
		name: 'box_width',
		type: 'number',
		default: 1,
		description: 'Width of the blur box in pixels. Must not exceed the video width.',
		required: true,
		displayOptions: {
			show: {
				operation: ['blurVideo'],
			},
		},
	},
	{
		displayName: 'Box Height',
		name: 'box_height',
		type: 'number',
		default: 1,
		description: 'Height of the blur box in pixels. Must not exceed the video height.',
		required: true,
		displayOptions: {
			show: {
				operation: ['blurVideo'],
			},
		},
	},
	{
		displayName: 'Power',
		name: 'power',
		type: 'number',
		default: 1,
		description: 'Blur intensity level',
		required: true,
		displayOptions: {
			show: {
				operation: ['blurVideo'],
			},
		},
	},
];
