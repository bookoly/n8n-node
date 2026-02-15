import { INodeProperties } from 'n8n-workflow';
import { Layout, ResourceType, VideoAction } from '../../types';

export const stackVideoParams: INodeProperties[] = [
	{
		displayName: 'Secondary Video - URL',
		name: 'secondary_video_url',
		type: 'string',
		required: true,
		default: '',
		description: 'The public and downloadable URL of the secondary video file to stack',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.STACK_VIDEOS],
			},
		},
	},
	{
		displayName: 'Secondary Video - Mute',
		name: 'secondary_video_mute',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to mute the audio of the secondary video',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.STACK_VIDEOS],
			},
		},
	},
	{
		displayName: 'Layout',
		name: 'layout',
		type: 'options',
		required: true,
		default: Layout.HORIZONTAL,
		options: [
			{
				name: 'Horizontal',
				value: Layout.HORIZONTAL,
				description: 'Stack videos side by side',
			},
			{
				name: 'Vertical',
				value: Layout.VERTICAL,
				description: 'Stack videos on top of each other',
			},
		],
		description: 'Layout direction for stacking the videos',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.STACK_VIDEOS],
			},
		},
	},
];
