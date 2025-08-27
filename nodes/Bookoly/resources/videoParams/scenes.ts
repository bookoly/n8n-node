import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const scenesParam = {
	displayName: 'Scenes',
	name: 'scenes',
	type: 'fixedCollection' as NodePropertyTypes,
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},
	placeholder: 'Add Scene',
	displayOptions: {
		show: { operation: [VideoAction.CREATE_SLIDESHOW, VideoAction.GENERATE_VIDEO] },
	},
	default: { scene: [{ type: 'image', src: '', duration: 1, effect: '' }] },
	options: [
		{
			displayName: 'Scene',
			name: 'scene',
			values: [
				{
					displayName: 'Type',
					name: 'type',
					type: 'options' as NodePropertyTypes,
					default: 'image',
					description: 'The type of the scene',
					options: [
						{ name: 'Image', value: 'image' },
						{ name: 'Video', value: 'video' },
					],
				},
				{
					displayName: 'URL',
					name: 'src',
					type: 'string' as NodePropertyTypes,
					default: '',
					description: 'The public and downloadable URL of the scene file',
					required: true,
				},
				{
					displayName: 'Duration',
					name: 'duration',
					type: 'number' as NodePropertyTypes,
					default: 1,
					description: 'The duration of the scene in seconds',
					displayOptions: {
						show: {
							type: ['image'],
						},
					},
				},
				{
					displayName: 'Effect',
					name: 'effect',
					type: 'options' as NodePropertyTypes,
					default: '',
					placeholder: 'Select an effect',
					description: 'The effect to apply to the scene',
					options: [
						{
							name: 'None',
							value: '',
							description: 'No visual effect will be applied to the scene',
						},
						{
							name: 'Zoom In',
							value: 'zoom_in',
							description: 'Apply a zoom-in effect to the scene',
						},
					],
				},
			],
		},
	],
	description: 'Add multiple scenes to the slideshow',
};
