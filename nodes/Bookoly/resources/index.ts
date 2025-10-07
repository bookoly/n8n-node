import { ResourceDefinition, ResourceType } from '../types';
import { soundResource } from './sound';
import { speechResource } from './speech';
import { speechDialogueResource } from './speechDialogue';
import { fileResource } from './file';
import { transcriptionResource } from './transcription';
import { videoResource } from './video';

export const RESOURCE_DEFINITIONS: { [key in ResourceType]: ResourceDefinition } = {
	[ResourceType.SOUND]: soundResource,
	[ResourceType.SPEECH]: speechResource,
	[ResourceType.SPEECH_DIALOGUE]: speechDialogueResource,
	[ResourceType.FILE]: fileResource,
	[ResourceType.TRANSCRIPT]: transcriptionResource,
	[ResourceType.VIDEO]: videoResource,
};

export * from './sound';
export * from './speech';
export * from './speechDialogue';
export * from './file';
export * from './transcription';
export * from './video';
