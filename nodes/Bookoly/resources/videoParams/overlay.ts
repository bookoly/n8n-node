import { INodeProperties } from 'n8n-workflow';
import { Position, ResourceType, VideoAction } from '../../types';

export const overlayVideoParams: INodeProperties[] = [
	{
		displayName: 'Overlay Video - URL',
		name: 'overlay_video_url',
		type: 'string',
		required: true,
		default: '',
		description: 'The public and downloadable URL of the overlay video file',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
	{
		displayName: 'Overlay Video - Mute',
		name: 'overlay_video_mute',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to mute the audio of the overlay video',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'options',
		required: true,
		default: Position.BOTTOM_RIGHT,
		options: [
			{
				name: 'Top Left',
				value: Position.TOP_LEFT,
				description: 'Position overlay at top left',
			},
			{
				name: 'Top Right',
				value: Position.TOP_RIGHT,
				description: 'Position overlay at top right',
			},
			{
				name: 'Bottom Left',
				value: Position.BOTTOM_LEFT,
				description: 'Position overlay at bottom left',
			},
			{
				name: 'Bottom Right',
				value: Position.BOTTOM_RIGHT,
				description: 'Position overlay at bottom right',
			},
			{
				name: 'Center',
				value: Position.CENTER,
				description: 'Position overlay at center',
			},
			{
				name: 'Center Top',
				value: Position.CENTER_TOP,
				description: 'Position overlay at center top',
			},
			{
				name: 'Center Bottom',
				value: Position.CENTER_BOTTOM,
				description: 'Position overlay at center bottom',
			},
			{
				name: 'Center Left',
				value: Position.CENTER_LEFT,
				description: 'Position overlay at center left',
			},
			{
				name: 'Center Right',
				value: Position.CENTER_RIGHT,
				description: 'Position overlay at center right',
			},
		],
		description: 'Position of the overlay video on the base video',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
	{
		displayName: 'Scale',
		name: 'scale',
		type: 'number',
		default: null,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		description: 'Scale percentage of the overlay video (1-100). Leave empty for default.',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
	{
		displayName: 'X Offset',
		name: 'x_offset',
		type: 'number',
		default: null,
		typeOptions: {
			minValue: 0,
		},
		description: 'Horizontal offset in pixels from the position anchor. Leave empty for default.',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
	{
		displayName: 'Y Offset',
		name: 'y_offset',
		type: 'number',
		default: null,
		typeOptions: {
			minValue: 0,
		},
		description: 'Vertical offset in pixels from the position anchor. Leave empty for default.',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.OVERLAY_VIDEOS],
			},
		},
	},
];
