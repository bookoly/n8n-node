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
		displayName: 'Amount',
		name: 'amount',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'Number of segments to split into',
		required: true,
		displayOptions: {
			show: {
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Min Scene Duration (Sec)',
		name: 'min_duration',
		type: 'number' as NodePropertyTypes,
		default: 0.1,
		description: 'The minimum length of each automatically detected scene. Must be >= 0.1.',
		required: true,
		displayOptions: {
			show: {
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Max Scene Duration (Sec)',
		name: 'max_duration',
		type: 'number' as NodePropertyTypes,
		default: 0.1,
		description: 'The maximum length of each automatically detected scene. Must be >= 0.1.',
		required: true,
		displayOptions: {
			show: {
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
	{
		displayName: 'Scene Change Sensitivity',
		name: 'scene_change_threshold',
		type: 'number' as NodePropertyTypes,
		default: 0.1,
		description:
			'Lower values detect more scene changes; higher values detect fewer. Range: 0.1 – 1.',
		required: true,
		displayOptions: {
			show: {
				operation: ['splitVideoIntoScenes'],
			},
		},
	},
];
