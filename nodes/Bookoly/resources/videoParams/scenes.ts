import { NodePropertyTypes } from 'n8n-workflow';
export const scenesParam = {
	displayName: 'Scenes',
	name: 'scenes',
	type: 'fixedCollection' as NodePropertyTypes,
	typeOptions: { multipleValues: true },
	default: {},
	description: 'Add multiple scenes to the slideshow',
	displayOptions: {
		show: { operation: ['createSlideshow', 'generateVideo'] },
	},
	options: [
		{
			displayName: 'Scene',
			name: 'scene',
			values: [
				{
					displayName: 'Effect',
					name: 'effect',
					type: 'options' as NodePropertyTypes,
					default: 'zoom_in',
					description: 'The effect to apply to the scene',
					options: [
						{ name: 'Zoom In', value: 'zoom_in', description: 'Apply zoom in effect to the scene' },
					],
				},
				{
					displayName: 'Duration',
					name: 'duration',
					type: 'number' as NodePropertyTypes,
					default: 1,
					description: 'The duration of the scene, required only when using images',
				},
				{
					displayName: 'Asset URL',
					name: 'src',
					type: 'string' as NodePropertyTypes,
					default: '',
					description: 'The public URL of the asset',
					required: true,
				},
				{
					displayName: 'Asset Type',
					name: 'type',
					type: 'options' as NodePropertyTypes,
					default: 'image',
					description: 'The type of asset for the scene',
					options: [
						{ name: 'Image', value: 'image', description: 'Use an image asset' },
						{ name: 'Video', value: 'video', description: 'Use a video asset' },
					],
				},
			],
		},
	],
};
