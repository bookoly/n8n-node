import { ResourceType } from '../types';
import { soundHandlers } from './sound';
import { speechHandlers } from './speech';
import { transcriptionHandlers } from './transcript';
import { fileHandlers } from './file';
import { videoHandlers } from './video';

export const HANDLERS: Record<ResourceType, Record<string, Function>> = {
	[ResourceType.SOUND]: soundHandlers,
	[ResourceType.SPEECH]: speechHandlers,
	[ResourceType.TRANSCRIPT]: transcriptionHandlers,
	[ResourceType.FILE]: fileHandlers,
	[ResourceType.VIDEO]: videoHandlers,
};
