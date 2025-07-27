import { BookolyResourceDefinition, BookolyResourceType } from '../types';
import { soundResource } from './sound';
// import { speechResource } from './speech';
// import { subtitleResource } from './subtitle';
// import { transcriptionResource } from './transcription';
// import { videoResource } from './video';

export const RESOURCE_DEFINITIONS: { [key in BookolyResourceType]: BookolyResourceDefinition } = {
	[BookolyResourceType.Sound]: soundResource,
	// [BookolyResourceType.Speech]: speechResource,
	// [BookolyResourceType.Subtitle]: subtitleResource,
	// [BookolyResourceType.Transcription]: transcriptionResource,
	// [BookolyResourceType.Video]: videoResource,
};

export * from './sound';
// export * from './speech';
// export * from './subtitle';
// export * from './transcription';
// export * from './video'; 