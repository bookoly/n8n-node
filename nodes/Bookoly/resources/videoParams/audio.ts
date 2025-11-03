import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const audioUrlParam = {
	displayName: 'Audio - URL',
	name: 'audio_url',
	type: 'string' as NodePropertyTypes,
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

export const trimAudioParam = {
	displayName: 'Audio - Trim',
	name: 'trim',
	type: 'boolean' as NodePropertyTypes,
	default: false,
	description: 'Trim audio to match video length (if longer)',
	displayOptions: {
		show: {
			operation: [VideoAction.ADD_AUDIO_TO_VIDEO, VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO],
		},
	},
};

export const audioVolumeParam = {
	displayName: 'Audio - Volume',
	name: 'volume',
	type: 'string' as NodePropertyTypes,
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
