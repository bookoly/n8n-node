import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const xCoordinateParam = {
	displayName: 'X Coordinate',
	name: 'x',
	type: 'number' as NodePropertyTypes,
	default: 0,
	description: 'Horizontal position of the crop’s top-left corner',
	required: true,
	typeOptions: {
		minValue: 0,
		numberPrecision: 0,
	},
	displayOptions: {
		show: {
			operation: [VideoAction.CROP_VIDEO],
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
	typeOptions: {
		minValue: 0,
		numberPrecision: 0,
	},
	displayOptions: {
		show: {
			operation: [VideoAction.CROP_VIDEO],
		},
	},
};

export const cropWidthParam = {
	displayName: 'Crop Width',
	name: 'width',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description: 'Width of the cropped area in pixels. Must not exceed the video width.',
	required: true,
	typeOptions: {
		minValue: 1,
		numberPrecision: 0,
	},
	displayOptions: {
		show: {
			operation: [VideoAction.CROP_VIDEO],
		},
	},
};

export const cropHeightParam = {
	displayName: 'Crop Height',
	name: 'height',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description: 'Height of the cropped area in pixels. Must not exceed the video height.',
	required: true,
	typeOptions: {
		minValue: 1,
		numberPrecision: 0,
	},
	displayOptions: {
		show: {
			operation: [VideoAction.CROP_VIDEO],
		},
	},
};
