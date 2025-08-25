import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const splitOptionParams: INodeProperties[] = [
	{
		displayName: 'Mode',
		name: 'type',
		type: 'options' as NodePropertyTypes,
		default: 'auto',
		description: 'Choose how you want to split the video into scenes',
		required: true,
		options: [
			{ name: 'Auto (Scene Detection)', value: 'auto' },
			{ name: 'Time (Fixed Interval)', value: 'time' },
			{ name: 'Count (Number of Segments)', value: 'count' },
		],
		displayOptions: {
			show: {
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Segment Length',
		name: 'amount',
		type: 'number' as NodePropertyTypes,
		default: 4,
		description: 'Splits the video into equal segments of the specified duration (in seconds)',
		required: true,
		displayOptions: {
			show: {
				type: ['time'],
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Number of Segments',
		name: 'amount',
		type: 'number' as NodePropertyTypes,
		default: 2,
		description: 'Splits the video into the specified total number of equal-length segments',
		required: true,
		displayOptions: {
			show: {
				type: ['count'],
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Min Scene Duration (Sec)',
		name: 'min_duration',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'The minimum length of each automatically detected scene',
		required: true,
		displayOptions: {
			show: {
				type: ['auto'],
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Max Scene Duration (Sec)',
		name: 'max_duration',
		type: 'number' as NodePropertyTypes,
		default: 2,
		description: 'The maximum length of each automatically detected scene',
		required: true,
		displayOptions: {
			show: {
				type: ['auto'],
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Scene Change Threshold',
		name: 'scene_change_threshold',
		type: 'number' as NodePropertyTypes,
		default: 0.2,
		description:
			'Lower values detect more scene changes; higher values detect fewer. Range: 0.1 – 1.',
		required: true,
		displayOptions: {
			show: {
				type: ['auto'],
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
];
