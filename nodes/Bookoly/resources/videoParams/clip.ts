import { INodeProperties } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const clipOptionParams: INodeProperties[] = [
	{
		displayName: 'Clip - Start Time',
		name: 'start',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 0.0,
			numberPrecision: 2,
		},
		default: 0.0,
		description: 'Set the clip start time in seconds from the start of the video',
		displayOptions: {
			show: {
				operation: [VideoAction.CLIP_VIDEO],
			},
		},
	},
	{
		displayName: 'Clip - End Time',
		name: 'duration',
		type: 'number',
		typeOptions: {
			minValue: 1,
			numberPrecision: 2,
		},
		default: 1,
		description:
			'Set the clip end time in seconds from the start of the video. Leave empty to use the video’s end.',
		displayOptions: {
			show: {
				operation: [VideoAction.CLIP_VIDEO],
			},
		},
	},
];
