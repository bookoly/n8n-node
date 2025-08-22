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
					displayName: 'Asset Type',
					name: 'type',
					type: 'options' as NodePropertyTypes,
					default: 'image',
					description: 'The type of asset for the scene',
					options: [
						{ name: 'Image', value: 'image' },
						{ name: 'Video', value: 'video' },
					],
				},
				{
					displayName: 'Asset URL',
					name: 'src',
					type: 'string' as NodePropertyTypes,
					default: '',
					description: 'The public and downloadable URL of the asset file',
					required: true,
				},
				{
					displayName: 'Duration',
					name: 'duration',
					type: 'number' as NodePropertyTypes,
					default: 1,
					description: 'Duration of the scene in seconds (required only for image-based scenes',
				},
				{
					displayName: 'Effect',
					name: 'effect',
					type: 'options' as NodePropertyTypes,
					default: 'none',
					placeholder: 'Select an effect',
					description: 'The effect to apply to the scene',
					options: [
						{ name: 'None', value: 'none', description: 'No effect' },
						{ name: 'Zoom In', value: 'zoom_in', description: 'Apply a zoom-in effect to the scene' },
					],
				},
			],
		},
	],
};
