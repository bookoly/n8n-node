import { VideoAction } from '../../types';
import { INodeProperties } from 'n8n-workflow';

export const audioUrlParam: INodeProperties = {
	displayName: 'Audio - URL',
	name: 'audio_url',
	type: 'string',
	default: '',
	description: 'The public and downloadable URL of the audio file',
	displayOptions: {
		show: {
			operation: [
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.GENERATE_VIDEO,
			],
		},
	},
};

export const trimAudioParam: INodeProperties = {
	displayName: 'Audio - Trim',
	name: 'trim',
	type: 'boolean',
	default: false,
	description: 'Whether to trim the audio to match video length (if longer)',
	displayOptions: {
		show: {
			operation: [VideoAction.ADD_AUDIO_TO_VIDEO, VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO],
		},
	},
};

export const audioVolumeParam: INodeProperties = {
	displayName: 'Audio - Volume',
	name: 'volume',
	type: 'string',
	default: '',
	description: 'Set audio volume from 0 to 100. 100 is the original volume and 0 is silent.',
	displayOptions: {
		show: {
			operation: [
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.GENERATE_VIDEO,
			],
		},
	},
};
