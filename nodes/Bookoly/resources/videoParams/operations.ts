import { VideoAction } from '../../types';

export const videoOperations = [
	{
		name: 'Add Audio to a Video',
		value: VideoAction.ADD_AUDIO_TO_VIDEO,
		description: 'Seamlessly add audio tracks to your video',
		action: 'Add audio to a video',
	},
	{
		name: 'Add Audio with Subtitles to a Video',
		value: VideoAction.ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO,
		description:
			'Adds audio to your video and automatically generates and adds subtitles from the audio',
		action: 'Add audio with subtitles to a video',
	},
	{
		name: 'Add Subtitles to a Video',
		value: VideoAction.ADD_SUBTITLES_TO_VIDEO,
		description: 'Automatically generates and adds subtitles to your video',
		action: 'Add subtitles to a video',
	},
	{
		name: 'Add Subtitles to a Video From a File',
		value: VideoAction.ADD_SUBTITLES_TO_VIDEO_FROM_FILE,
		description: 'Automatically generates and adds subtitles to your video',
		action: 'Add subtitles to a video from a file',
	},
	{
		name: 'Add Watermark to a Video',
		value: VideoAction.ADD_WATERMARK_TO_VIDEO,
		description: 'Places an image as a watermark on the video at specified coordinates',
		action: 'Add a watermark to a video',
	},
	{
		name: 'Blur a Video',
		value: VideoAction.BLUR_VIDEO,
		description: 'Apply a blur effect to a specific area of a video',
		action: 'Blur a video',
	},
	{
		name: 'Clip A Video',
		value: VideoAction.CLIP_VIDEO,
		description: 'Extract a clip from a video using a start time and duration',
		action: 'Clip a video',
	},
	{
		name: 'Create a Slideshow',
		value: VideoAction.CREATE_SLIDESHOW,
		description: 'Creates a video slideshow from images, videos, or a combination of both',
		action: 'Create a slideshow',
	},
	{
		name: 'Crop a Video',
		value: VideoAction.CROP_VIDEO,
		description: 'Crops the video to a specific area using custom coordinates and dimensions',
		action: 'Crop a video',
	},
	{
		name: 'Extract Audio From a Video',
		value: VideoAction.EXTRACT_AUDIO_FROM_VIDEO,
		description: 'Separates and saves the audio track from a video file',
		action: 'Extract audio from a video',
	},
	{
		name: 'Frame a Video',
		value: VideoAction.FRAME_VIDEO,
		description:
			'Extract a single frame from a video at a specified timestamp and save it as an image',
		action: 'Frame a video',
	},
	{
		name: 'Generate a Video',
		value: VideoAction.GENERATE_VIDEO,
		description:
			'Create a video from images and video clips, generate and add a voice-over with automated subtitles, and integrate background music',
		action: 'Generate a video',
	},
	{
		name: 'Get a Specific Video',
		value: VideoAction.GET_VIDEO,
		description: 'Fetches video data from the API using the video ID',
		action: 'Get a video',
	},
	{
		name: 'Mute a Video',
		value: VideoAction.MUTE_VIDEO,
		description: "Mute the video's audio by reducing the volume to zero",
		action: 'Mute a video',
	},
	{
		name: 'Rotate a Video',
		value: VideoAction.ROTATE_VIDEO,
		description: 'Rotate a video by 90, 180, or 270 degrees clockwise',
		action: 'Rotate a video',
	},
	{
		name: 'Split a Video Into Scenes',
		value: VideoAction.SPLIT_VIDEO_INTO_SCENES,
		description:
			'Automatically divide a video into multiple segments based on scene detection or fixed intervals',
		action: 'Split a video into scenes',
	},
];
