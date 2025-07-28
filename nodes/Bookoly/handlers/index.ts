import { BookolyResourceType } from '../types';
import { soundHandlers } from './sound';

export const HANDLERS: Record<BookolyResourceType, Record<string, Function>> = {
	[BookolyResourceType.Sound]: soundHandlers,
	// Add other resource handlers here as you implement them:
	// [BookolyResourceType.Speech]: speechHandlers,
	// [BookolyResourceType.Subtitle]: subtitleHandlers,
	// etc...
}; 