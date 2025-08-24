import { NodePropertyTypes } from 'n8n-workflow';

export const xCoordinateParam = {
	displayName: 'X Coordinate',
	name: 'x',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description: 'Horizontal position of the crop’s top-left corner',
	required: true,
	displayOptions: {
		show: {
			operation: ['cropVideo'],
		},
	},
};

export const yCoordinateParam = {
	displayName: 'Y Coordinate',
	name: 'y',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description: 'Vertical position of the crop’s top-left corner',
	required: true,
	displayOptions: {
		show: {
			operation: ['cropVideo'],
		},
	},
};

export const cropWidthParam = {
	displayName: 'Crop Width',
	name: 'width',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description: 'Width of the cropped area in pixels',
	required: true,
	displayOptions: {
		show: {
			operation: ['cropVideo'],
		},
	},
};

export const cropHeightParam = {
	displayName: 'Crop Height',
	name: 'height',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description: 'Height of the cropped area in pixels',
	required: true,
	displayOptions: {
		show: {
			operation: ['cropVideo'],
		},
	},
};
