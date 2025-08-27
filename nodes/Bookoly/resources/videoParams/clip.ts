import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const clipOptionParam = {
	displayName: 'Clip Options',
	name: 'clip_option',
	type: 'fixedCollection' as NodePropertyTypes,
	default: {},
	description: 'Configure the video clip settings',
	displayOptions: {
		show: {
			operation: [VideoAction.CLIP_VIDEO],
		},
	},
	options: [
		{
			displayName: 'Clip Options',
			name: 'clipOptions',
			values: [
				{
					displayName: 'Clip Start Time',
					name: 'start',
					type: 'number' as NodePropertyTypes,
					default: 0,
					description:
						'Set the start time of the clip (in seconds) from the beginning of the video',
					required: true,
				},
				{
					displayName: 'Clip Duration',
					name: 'duration',
					type: 'number' as NodePropertyTypes,
					default: 1,
					description:
						'Set how long the clip should be (in seconds). Leave blank to include the remainder of the video.',
					required: true,
				},
			],
		},
	],
};
