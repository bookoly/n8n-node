import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const splitOptionParams: INodeProperties[] = [
	{
		displayName: 'Split - Mode',
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
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
	{
		displayName: 'Split - Segment Length',
		name: 'amount',
		type: 'number' as NodePropertyTypes,
		default: 4,
		description: 'Splits the video into equal segments of the specified duration (in seconds)',
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				type: ['time'],
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
	{
		displayName: 'Split - Number of Segments',
		name: 'amount',
		type: 'number' as NodePropertyTypes,
		default: 2,
		description: 'Splits the video into the specified total number of equal-length segments',
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				type: ['count'],
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
	{
		displayName: 'Split - Min Scene Duration (Sec)',
		name: 'min_duration',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'The minimum length of each automatically detected scene',
		required: true,
		typeOptions: {
			minValue: 0.1,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				type: ['auto'],
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
	{
		displayName: 'Split - Max Scene Duration (Sec)',
		name: 'max_duration',
		type: 'number' as NodePropertyTypes,
		default: 2,
		description: 'The maximum length of each automatically detected scene',
		required: true,
		typeOptions: {
			minValue: 0.1,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				type: ['auto'],
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
	{
		displayName: 'Split - Scene Change Threshold',
		name: 'scene_change_threshold',
		type: 'number' as NodePropertyTypes,
		default: 0.2,
		description:
			'Lower values detect more scene changes; higher values detect fewer. Range: 0.1 – 1.',
		required: true,
		typeOptions: {
			minValue: 0.1,
			maxValue: 1,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				type: ['auto'],
				operation: [VideoAction.SPLIT_VIDEO_INTO_SCENES],
			},
		},
	},
];
