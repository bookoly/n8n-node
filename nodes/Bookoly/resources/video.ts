import { VideoAction, ResourceDefinition, ResourceType } from '../types';
import { getSubtitleParameters } from './subtitleParams';
import {
	getNameParam,
	getUrlParam,
	getWebhookUrlParam,
	getVoiceParam,
	getIdParam,
	getResolutionParam,
	getMuteParam,
	getTypeParam,
	getSubtitleUrlParam,
	getSecParam,
	getTextParam,
	getRotateParam,
	getWaitParam,
} from './commonParams';
import { scenesParam } from './videoParams/scenes';
import { watermarkParams } from './videoParams/watermark';
import { blurOptionParam } from './videoParams/blur';
import { clipOptionParams } from './videoParams/clip';
import { cropOptionParams } from './videoParams/crop';
import { audioUrlParam, trimAudioParam, audioVolumeParam } from './videoParams/audio';
import { splitOptionParams } from './videoParams/split';
import { videoOperations } from './videoParams/operations';

export const videoResource: ResourceDefinition = {
	displayName: 'Video',
	value: ResourceType.VIDEO,
	description: 'Manage video operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.VIDEO],
				},
			},
			options: videoOperations,
			default: VideoAction.GENERATE_VIDEO,
		},
	],
	parameters: [
		getIdParam(
			VideoAction.GET_VIDEO,
			ResourceType.VIDEO,
			'videoId',
			'Video ID',
			'The ID of the video',
		),
		getNameParam(
			[
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE,
				VideoAction.ADD_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_WATERMARK_TO_VIDEO,
				VideoAction.BLUR_VIDEO,
				VideoAction.CLIP_VIDEO,
				VideoAction.CREATE_SLIDESHOW,
				VideoAction.CROP_VIDEO,
				VideoAction.EXTRACT_AUDIO_FROM_VIDEO,
				VideoAction.FRAME_VIDEO,
				VideoAction.GENERATE_VIDEO,
				VideoAction.MUTE_VIDEO,
				VideoAction.ROTATE_VIDEO,
				VideoAction.SPLIT_VIDEO_INTO_SCENES,
			],
			ResourceType.VIDEO,
			'The name of the video',
		),
		getUrlParam(
			[
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE,
				VideoAction.ADD_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_WATERMARK_TO_VIDEO,
				VideoAction.BLUR_VIDEO,
				VideoAction.CLIP_VIDEO,
				VideoAction.CROP_VIDEO,
				VideoAction.EXTRACT_AUDIO_FROM_VIDEO,
				VideoAction.FRAME_VIDEO,
				VideoAction.MUTE_VIDEO,
				VideoAction.ROTATE_VIDEO,
				VideoAction.SPLIT_VIDEO_INTO_SCENES,
			],
			ResourceType.VIDEO,
		),
		getMuteParam(
			[
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_WATERMARK_TO_VIDEO,
				VideoAction.BLUR_VIDEO,
				VideoAction.CLIP_VIDEO,
				VideoAction.CROP_VIDEO,
				VideoAction.ROTATE_VIDEO,
				VideoAction.SPLIT_VIDEO_INTO_SCENES,
			],
			ResourceType.VIDEO,
		),
		getResolutionParam(
			[VideoAction.CREATE_SLIDESHOW, VideoAction.GENERATE_VIDEO],
			ResourceType.VIDEO,
		),
		getTextParam([VideoAction.GENERATE_VIDEO], ResourceType.VIDEO),
		getVoiceParam(VideoAction.GENERATE_VIDEO, ResourceType.VIDEO),
		getTypeParam([VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE], ResourceType.VIDEO),
		getSubtitleUrlParam([VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE], ResourceType.VIDEO),
		getSecParam([VideoAction.FRAME_VIDEO], ResourceType.VIDEO),
		getRotateParam([VideoAction.ROTATE_VIDEO], ResourceType.VIDEO),
		// Extracted unique/complex parameter groups
		audioUrlParam,
		trimAudioParam,
		audioVolumeParam,
		scenesParam,
		...watermarkParams,
		...clipOptionParams,
		...cropOptionParams,
		...blurOptionParam,
		...splitOptionParams,
		...getSubtitleParameters([
			VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
			VideoAction.ADD_SUBTITLES_TO_VIDEO,
			VideoAction.GENERATE_VIDEO,
		]),
		getWaitParam(
			[
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE,
				VideoAction.ADD_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_WATERMARK_TO_VIDEO,
				VideoAction.BLUR_VIDEO,
				VideoAction.CLIP_VIDEO,
				VideoAction.CREATE_SLIDESHOW,
				VideoAction.CROP_VIDEO,
				VideoAction.EXTRACT_AUDIO_FROM_VIDEO,
				VideoAction.FRAME_VIDEO,
				VideoAction.GENERATE_VIDEO,
				VideoAction.MUTE_VIDEO,
				VideoAction.ROTATE_VIDEO,
				VideoAction.SPLIT_VIDEO_INTO_SCENES,
			],
			ResourceType.VIDEO,
			'If enabled, the node pauses the workflow and checks the server until the video generation is finished, then returns the full video object. If disabled, only the ID and creation timestamp are returned.',
		),
		getWebhookUrlParam(
			[
				VideoAction.ADD_AUDIO_TO_VIDEO,
				VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE,
				VideoAction.ADD_SUBTITLES_TO_VIDEO,
				VideoAction.ADD_WATERMARK_TO_VIDEO,
				VideoAction.BLUR_VIDEO,
				VideoAction.CLIP_VIDEO,
				VideoAction.CREATE_SLIDESHOW,
				VideoAction.CROP_VIDEO,
				VideoAction.EXTRACT_AUDIO_FROM_VIDEO,
				VideoAction.FRAME_VIDEO,
				VideoAction.GENERATE_VIDEO,
				VideoAction.MUTE_VIDEO,
				VideoAction.ROTATE_VIDEO,
				VideoAction.SPLIT_VIDEO_INTO_SCENES,
			],
			ResourceType.VIDEO,
			'Enter a valid URL to receive webhook notifications. Video ID and URL will be included.',
		),
	],
};
