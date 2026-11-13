import { VideoAction } from '../../types';
import { INodeProperties } from 'n8n-workflow';

export const scenesParam: INodeProperties = {
	displayName: 'Video - Scenes (JSON)',
	name: 'scenes',
	type: 'json',
	displayOptions: {
		show: { operation: [VideoAction.CREATE_SLIDESHOW, VideoAction.GENERATE_VIDEO] },
	},
	default: `[
  {
    "asset": {
      "src": "",
      "type": "image"
    },
    "duration": 10,
    "mute": false,
    "effect": "",
    "transition": {
      "name": "fade",
      "duration": 5
    }
  }
]`,
	description: 'Add multiple scenes (JSON) to the slideshow',
};
