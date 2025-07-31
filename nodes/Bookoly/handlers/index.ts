import { BookolyResourceType } from '../types';
import { soundHandlers } from './sound';
import { speechHandlers } from './speech';
import { transcriptionHandlers } from './transcription';
import { fileHandlers } from './file';

export const HANDLERS: Record<BookolyResourceType, Record<string, Function>> = {
	[BookolyResourceType.Sound]: soundHandlers,
	[BookolyResourceType.Speech]: speechHandlers,
	[BookolyResourceType.Transcription]: transcriptionHandlers,
	[BookolyResourceType.File]: fileHandlers,
}; 