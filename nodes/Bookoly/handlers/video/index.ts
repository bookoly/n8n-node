import { addAudioToVideo } from './addAudioToVideo';
import { addAudioWithSubtitlesToVideo } from './addAudioWithSubtitlesToVideo';
import { addSubtitlesToVideo } from './addSubtitlesToVideo';
import { addSubtitlesToVideoFromFile } from './addSubtitlesToVideoFromFile';
import { addWatermarkToVideo } from './addWatermarkToVideo';
import { blurVideo } from './blurVideo';
import { clipVideo } from './clipVideo';
import { createSlideshow } from './createSlideshow';
import { cropVideo } from './cropVideo';
import { extractAudioFromVideo } from './extractAudioFromVideo';
import { frameVideo } from './frameVideo';
import { generateVideo } from './generateVideo';
import { muteVideo } from './muteVideo';
import { overlayVideos } from './overlayVideos';
import { rotateVideo } from './rotateVideo';
import { scaleVideo } from './scaleVideo';
import { splitVideoIntoScenes } from './splitVideoIntoScenes';
import { stackVideos } from './stackVideos';
import { getResource as getVideo } from '../getResource';

export const videoHandlers = {
	addAudioToVideo,
	addAudioWithSubtitlesToVideo,
	addSubtitlesToVideo,
	addSubtitlesToVideoFromFile,
	addWatermarkToVideo,
	blurVideo,
	clipVideo,
	createSlideshow,
	cropVideo,
	extractAudioFromVideo,
	frameVideo,
	generateVideo,
	muteVideo,
	overlayVideos,
	rotateVideo,
	scaleVideo,
	splitVideoIntoScenes,
	stackVideos,
	getVideo,
};
