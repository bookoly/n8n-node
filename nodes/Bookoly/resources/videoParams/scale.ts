import { INodeProperties } from 'n8n-workflow';
import { ResourceType, ScaleMode, VideoAction } from '../../types';

export const scaleVideoParams: INodeProperties[] = [
	{
		displayName: 'Scale Mode',
		name: 'mode',
		type: 'options',
		required: true,
		default: ScaleMode.SCALE_TO_WIDTH,
		options: [
			{
				name: 'Scale to Width',
				value: ScaleMode.SCALE_TO_WIDTH,
				description: 'Scale the video to a specific width, maintaining aspect ratio',
			},
			{
				name: 'Scale to Height',
				value: ScaleMode.SCALE_TO_HEIGHT,
				description: 'Scale the video to a specific height, maintaining aspect ratio',
			},
			{
				name: 'Scale to Fit',
				value: ScaleMode.SCALE_TO_FIT,
				description: 'Scale the video to fit within the specified dimensions',
			},
			{
				name: 'Scale to Fill',
				value: ScaleMode.SCALE_TO_FILL,
				description: 'Scale the video to fill the specified dimensions',
			},
			{
				name: 'Scale Exact',
				value: ScaleMode.SCALE_EXACT,
				description: 'Scale the video to exact dimensions (may distort)',
			},
			{
				name: 'Scale Keep Aspect Ratio',
				value: ScaleMode.SCALE_KEEP_ASPECT_RATIO,
				description: 'Scale the video keeping the aspect ratio',
			},
		],
		description: 'The scaling mode to apply to the video',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.SCALE_VIDEO],
			},
		},
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		default: null,
		typeOptions: {
			minValue: 2,
		},
		description: 'Width in pixels (must be even number, minimum 2)',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.SCALE_VIDEO],
				mode: [
					ScaleMode.SCALE_TO_WIDTH,
					ScaleMode.SCALE_TO_FIT,
					ScaleMode.SCALE_TO_FILL,
					ScaleMode.SCALE_EXACT,
					ScaleMode.SCALE_KEEP_ASPECT_RATIO,
				],
			},
		},
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		default: null,
		typeOptions: {
			minValue: 2,
		},
		description: 'Height in pixels (must be even number, minimum 2)',
		displayOptions: {
			show: {
				resource: [ResourceType.VIDEO],
				operation: [VideoAction.SCALE_VIDEO],
				mode: [
					ScaleMode.SCALE_TO_HEIGHT,
					ScaleMode.SCALE_TO_FIT,
					ScaleMode.SCALE_TO_FILL,
					ScaleMode.SCALE_EXACT,
					ScaleMode.SCALE_KEEP_ASPECT_RATIO,
				],
			},
		},
	},
];
