import { NodePropertyTypes } from 'n8n-workflow';
import { VideoAction } from '../../types';

export const audioUrlParam = {
	displayName: 'Audio URL',
	name: 'audio_url',
	type: 'string' as NodePropertyTypes,
	default: '',
	description: 'The public and downloadable URL of the audio file',
	required: true,
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
	displayName: 'Trim Audio',
	name: 'trim',
	type: 'boolean' as NodePropertyTypes,
	default: false,
	description: 'Trim audio to match video length (if longer)',
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

export const audioVolumeParam = {
	displayName: 'Volume',
	name: 'volume',
	type: 'number' as NodePropertyTypes,
	default: 100,
	description:
		'Set audio volume from 0% to 100%. 100% is the original volume, and 50% is half the original volume.',
	typeOptions: {
		minValue: 1,
		maxValue: 100,
		numberPrecision: 0,
	},
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
