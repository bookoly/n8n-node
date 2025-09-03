import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const clipOptionParams: INodeProperties[] = [
	{
		displayName: 'Clip - Start Time',
		name: 'start',
		type: 'number' as NodePropertyTypes,
		required: true,
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		default: 0.0,
		description: 'Set the start time of the clip (in seconds) from the beginning of the video',
		displayOptions: {
			show: {
				operation: [VideoAction.CLIP_VIDEO],
			},
		},
	},
	{
		displayName: 'Clip - Duration',
		name: 'duration',
		type: 'number' as NodePropertyTypes,
		typeOptions: {
			minValue: 1,
			numberPrecision: 2,
		},
		default: 1,
		description:
			'Set how long the clip should be (in seconds). Leave blank to include the remainder of the video.',
		displayOptions: {
			show: {
				operation: [VideoAction.CLIP_VIDEO],
			},
		},
	},
];
