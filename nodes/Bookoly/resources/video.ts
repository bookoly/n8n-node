import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { getSubtitleParameters } from './subtitleParams';
import { resolutionOptions } from './static';

export const videoResource: BookolyResourceDefinition = {
	displayName: 'Video',
	value: BookolyResourceType.Video,
	description: 'Manage video operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.Video],
				},
			},
			options: [
				{
					name: 'Add Audio to Video',
					value: 'addAudioToVideo',
					description: 'Seamlessly add audio tracks to your video',
					action: 'Add audio to a video',
				},
				{
					name: 'Add Audio with Subtitle to Video',
					value: 'addAudioWithSubtitlesToVideo',
					description:
						'Adds audio to your video and automatically generates and adds subtitles from the audio',
					action: 'Add audio with subtitles to a video',
				},
				{
					name: 'Add Subtitles to a Video From a File',
					value: 'addSubtitlesToVideoFromFile',
					description: 'Automatically generates and adds subtitles to your video',
					action: 'Add subtitles to a video from a file',
				},
				{
					name: 'Add Subtitles to Video',
					value: 'addSubtitlesToVideo',
					description: 'Automatically generates and adds subtitles to your video',
					action: 'Add subtitles to a video',
				},
				{
					name: 'Add Watermark to a Video',
					value: 'addWatermarkToVideo',
					description: 'Places an image as a watermark on the video at specified coordinates',
					action: 'Add a watermark to a video',
				},
				{
					name: 'Blur a Video',
					value: 'blurVideo',
					description: 'Apply a blur effect to a specific area of a video',
					action: 'Blur a video',
				},
				{
					name: 'Clip A Video',
					value: 'clipVideo',
					description: 'Extract a clip from a video using a start time and duration',
					action: 'Clip a video',
				},
				{
					name: 'Create a Slideshow',
					value: 'createSlideshow',
					description: 'Creates a video slideshow from images, videos, or a combination of both',
					action: 'Create a slideshow from a list of images',
				},
				{
					name: 'Crop a Video',
					value: 'cropVideo',
					description: 'Crops the video to a specific area using custom coordinates and dimensions',
					action: 'Crop a video',
				},
				{
					name: 'Extract Audio From Video',
					value: 'extractAudioFromVideo',
					description: 'Separates and saves the audio track from a video file',
					action: 'Extract audio from a video',
				},
				{
					name: 'Frame a Video',
					value: 'frameVideo',
					description:
						'Extract a single frame from a video at a specified timestamp and save it as an image',
					action: 'Frame a video',
				},
				{
					name: 'Generate Video',
					value: 'generateVideo',
					description:
						'Create a video from images and video clips, generate and add a voice-over with automated subtitles, and integrate background music',
					action: 'Generate a video from a text description',
				},
				{
					name: 'Mute a Video',
					value: 'muteVideo',
					description: "Mute the video's audio by reducing the volume to zero",
					action: 'Mute a video by reducing the volume to zero',
				},
				{
					name: 'Rotate a Video',
					value: 'rotateVideo',
					description: 'Rotate a video by 90, 180, or 270 degrees clockwise',
					action: 'Rotate a video',
				},
				{
					name: 'Split Video Into Scenes',
					value: 'splitVideoIntoScenes',
					description:
						'Automatically divide a video into multiple segments based on scene detection or fixed intervals',
					action: 'Split a video into scenes',
				},
				{
					name: 'Wait for Video Generation',
					value: 'waitForVideoGeneration',
					description: 'Pauses the workflow until the video generation process is finished',
					action: 'Pauses the workflow until the video generation process is finished',
				},
			],
			default: 'generateVideo',
		},
	],
	parameters: [
		{
			displayName: 'Video ID',
			name: 'videoId',
			type: 'string',
			default: '',
			description: 'The ID of the video',
			required: true,
			displayOptions: {
				show: {
					operation: ['waitForVideoGeneration'],
				},
			},
		},
		// Video parameters for addAudioToVideo
		{
			displayName: 'Video Name',
			name: 'name',
			type: 'string',
			default: '',
			description: 'The name of the video',
			required: true,
			displayOptions: {
				show: {
					operation: [
						'addAudioToVideo',
						'addAudioWithSubtitlesToVideo',
						'addSubtitlesToVideo',
						'addSubtitlesToVideoFromFile',
						'createSlideshow',
						'addWatermarkToVideo',
						'blurVideo',
						'clipVideo',
						'cropVideo'
					],
				},
			},
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: '',
			description: 'The URL of the video',
			required: true,
			displayOptions: {
				show: {
					operation: [
						'addAudioToVideo',
						'addAudioWithSubtitlesToVideo',
						'addSubtitlesToVideo',
						'addSubtitlesToVideoFromFile',
						'addWatermarkToVideo',
						'blurVideo',
						'clipVideo',
						'cropVideo'
					],
				},
			},
		},
		{
			displayName: 'Mute Video',
			name: 'mute',
			type: 'boolean',
			default: false,
			description: 'Whether to mute the original video audio',
			displayOptions: {
				show: {
					operation: [
						'addAudioToVideo',
						'addAudioWithSubtitlesToVideo',
						'addWatermarkToVideo',
						'blurVideo',
						'clipVideo',
						'cropVideo'
					],
				},
			},
		},
		{
			displayName: 'Webhook URL',
			name: 'webhook_url',
			type: 'string',
			default: '',
			description:
				'Enter a valid URL to receive webhook notifications. Video ID and URL will be included.',
			displayOptions: {
				show: {
					operation: [
						'addAudioToVideo',
						'addAudioWithSubtitlesToVideo',
						'addSubtitlesToVideo',
						'addSubtitlesToVideoFromFile',
						'createSlideshow',
						'addWatermarkToVideo',
						'blurVideo',
						'clipVideo',
						'cropVideo'
					],
				},
			},
		},
		// Audio parameters for addAudioToVideo
		{
			displayName: 'Audio URL',
			name: 'url',
			type: 'string',
			default: '',
			description: 'The URL of the audio',
			required: true,
			displayOptions: {
				show: {
					operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
				},
			},
		},
		{
			displayName: 'Trim Audio',
			name: 'trim',
			type: 'boolean',
			default: false,
			description: 'Whether to trim the audio to match video length',
			displayOptions: {
				show: {
					operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
				},
			},
		},
		{
			displayName: 'Volume',
			name: 'volume',
			type: 'number',
			default: 100,
			description:
				'Set audio volume from 0% to 100%. 100% is the original volume, and 50% is half the original volume.',
			displayOptions: {
				show: {
					operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
				},
			},
		},
		// Subtitle parameters for addAudioWithSubtitlesToVideo
		...getSubtitleParameters('addAudioWithSubtitlesToVideo'),
		// Subtitle parameters for addSubtitlesToVideo
		...getSubtitleParameters('addSubtitlesToVideo'),
		// Subtitle parameters for addSubtitlesToVideoFromFile
		{
			displayName: 'File Type',
			name: 'type',
			type: 'options',
			default: 'ass',
			displayOptions: {
				show: {
					operation: ['addSubtitlesToVideoFromFile'],
				},
			},
			options: [
				{
					name: 'Advanced SubStation Alpha (ASS)',
					value: 'ass',
				},
			],
			description: 'Choose the format for your subtitle. ASS is selected by default.',
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					operation: ['addSubtitlesToVideoFromFile'],
				},
			},
			description: 'The public URL of the subtitle file',
		},
		{
			displayName: 'Scenes',
			name: 'scenes',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			description: 'Add multiple scenes to the slideshow',
			displayOptions: {
				show: {
					operation: ['createSlideshow'],
				},
			},
			options: [
				{
					displayName: 'Scene',
					name: 'scene',
					values: [
						{
							displayName: 'Effect',
							name: 'effect',
							type: 'options',
							default: 'zoom_in',
							description: 'The effect to apply to the scene',
							options: [
								{
									name: 'Zoom In',
									value: 'zoom_in',
									description: 'Apply zoom in effect to the scene',
								},
							],
						},
						{
							displayName: 'Duration',
							name: 'duration',
							type: 'number',
							default: 1,
							description: 'The duration of the scene, required only when using images',
						},
						{
							displayName: 'Asset URL',
							name: 'src',
							type: 'string',
							default: '',
							description: 'The public URL of the asset',
							required: true,
						},
						{
							displayName: 'Asset Type',
							name: 'type',
							type: 'options',
							default: 'image',
							description: 'The type of asset for the scene',
							options: [
								{
									name: 'Image',
									value: 'image',
									description: 'Use an image asset',
								},
								{
									name: 'Video',
									value: 'video',
									description: 'Use a video asset',
								},
							],
						},
					],
				},
			],
		},
		// Resolution parameter for createSlideshow
		{
			displayName: 'Resolution',
			name: 'resolution',
			type: 'options',
			default: 'horizontal_hd',
			description: 'The resolution of your video',
			required: true,
			displayOptions: {
				show: {
					operation: ['createSlideshow'],
				},
			},
			options: resolutionOptions,
		},
		// Watermark parameters for addWatermarkToVideo
		{
			displayName: 'Image URL',
			name: 'watermarkUrl',
			type: 'string',
			default: '',
			description: 'Direct URL to the watermark image (e.g., PNG or JPG)',
			required: true,
			displayOptions: {
				show: {
					operation: ['addWatermarkToVideo'],
				},
			},
		},
		{
			displayName: 'Position',
			name: 'watermarkPosition',
			type: 'fixedCollection',
			default: {},
			description: 'Set the absolute position of the watermark from the top-left corner of the video',
			displayOptions: {
				show: {
					operation: ['addWatermarkToVideo'],
				},
			},
			options: [
				{
					displayName: 'Position',
					name: 'position',
					values: [
						{
							displayName: 'X Coordinate',
							name: 'x',
							type: 'number',
							default: 0,
							description: 'Distance in pixels from the left edge of the video',
							required: true,
						},
						{
							displayName: 'Y Coordinate',
							name: 'y',
							type: 'number',
							default: 0,
							description: 'Distance in pixels from the top edge of the video',
							required: true,
						},
					],
				},
			],
		},
		// Blur parameters for blurVideo
		{
			displayName: 'Blur Setting',
			name: 'blur_option',
			type: 'fixedCollection',
			default: {},
			description: 'Set the top-left corner (X, Y) of the area to blur. Coordinates must be within the videos dimensions.',
			displayOptions: {
				show: {
					operation: ['blurVideo'],
				},
			},
			options: [
				{
					displayName: 'Start Position',
					name: 'point',
					values: [
						{
							displayName: 'X Coordinate',
							name: 'x',
							type: 'number',
							default: 0,
							description: 'Horizontal position of the top-left corner of the blur area',
							required: true,
						},
						{
							displayName: 'Y Coordinate',
							name: 'y',
							type: 'number',
							default: 0,
							description: 'Vertical position of the top-left corner of the blur area',
							required: true,
						},
					],
				},
				{
					displayName: 'Box Width',
					name: 'boxWidth',
					type: 'number',
					default: 1,
					description: 'Width of the blur box in pixels. Must not exceed the video width.',
					required: true,
					displayOptions: {
						show: {
							operation: ['blurVideo'],
						},
					},
				},
				{
					displayName: 'Box Height',
					name: 'boxHeight',
					type: 'number',
					default: 1,
					description: 'Height of the blur box in pixels. Must not exceed the video height.',
					required: true,
					displayOptions: {
						show: {
							operation: ['blurVideo'],
						},
					},
				},
				{
					displayName: 'Power',
					name: 'power',
					type: 'number',
					default: 1,
					description: 'Blur intensity level',
					required: true,
					displayOptions: {
						show: {
							operation: ['blurVideo'],
						},
					},
				},
			],
		},
		
		// Clip parameters for clipVideo
		{
			displayName: 'Clip Options',
			name: 'clip_option',
			type: 'fixedCollection',
			default: {},
			description: 'Configure the video clip settings',
			displayOptions: {
				show: {
					operation: ['clipVideo'],
				},
			},
			options: [
				{
					displayName: 'Clip Options',
					name: 'clipOptions',
					values: [
						{
							displayName: 'Clip Start Time',
							name: 'start',
							type: 'number',
							default: 0,
							description: 'Set the start time of the clip (in seconds) from the beginning of the video',
							required: true,
						},
						{
							displayName: 'Clip Duration',
							name: 'duration',
							type: 'number',
							default: 0,
							description: 'Set how long the clip should be (in seconds). Leave blank to include the remainder of the video.',
							required: true,
						},
					],
				},
			],
		},
		// Crop parameters for cropVideo
		{
			displayName: 'Crop Options',
			name: 'crop_option',
			type: 'fixedCollection',
			default: {},
			description: 'Configure the video crop settings',
			displayOptions: {
				show: {
					operation: ['cropVideo'],
				},
			},
			options: [
				{
					displayName: 'Crop Options',
					name: 'cropOptions',
					values: [
						{
							displayName: 'Crop Start Position',
							name: 'point',
							type: 'fixedCollection',
							default: {},
							description: 'Set the top-left corner (X, Y) of the crop area. Coordinates must be within the videos dimensions.',
							options: [
								{
									displayName: 'Crop Start Position',
									name: 'point',
									values: [
										{
											displayName: 'X Coordinate',
											name: 'x',
											type: 'number',
											default: 0,
											description: 'Horizontal position of the crops top-left corner',
											required: true,
										},
										{
											displayName: 'Y Coordinate',
											name: 'y',
											type: 'number',
											default: 0,
											description: 'Vertical position of the crops top-left corner',
											required: true,
										},
									],
								},
							],
						},
						{
							displayName: 'Crop Width',
							name: 'width',
							type: 'number',
							default: 1,
							description: 'Width of the cropped area in pixels. Must not exceed the video width.',
							required: true,
						},
						{
							displayName: 'Crop Height',
							name: 'height',
							type: 'number',
							default: 1,
							description: 'Height of the cropped area in pixels. Must not exceed the video height.',
							required: true,
						},
					],
				},
			],
		},
	],
};
