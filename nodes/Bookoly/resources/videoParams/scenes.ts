import { VideoAction } from '../../types';
import { NodePropertyTypes } from 'n8n-workflow';

export const scenesParam = {
	displayName: 'Video - Scenes (JSON)',
	name: 'scenes',
	type: 'json' as NodePropertyTypes,
	displayOptions: {
		show: { operation: [VideoAction.CREATE_SLIDESHOW, VideoAction.GENERATE_VIDEO] },
	},
	default:
		'[\n' +
		'  {\n' +
		'    "asset": {\n' +
		'      "src": "",\n' +
		'      "type": "image"\n' +
		'    },\n' +
		'    "duration": 10,\n' +
		'    "mute": false,\n' +
		'    "effect": "",\n' +
		'    "transition": {\n' +
		'      "name": "fade",\n' +
		'      "duration": 5\n' +
		'    }\n' +
		'  }\n' +
		']',
	description: 'Add multiple scenes (JSON) to the slideshow',
};
