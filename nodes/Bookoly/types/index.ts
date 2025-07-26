// Credentials
export interface BookolyCredentials {
	apiToken: string;
}

// Base parameter interfaces
export interface BaseApiParams {
	apiToken: string;
}

// Resource types enum
export enum BookolyResourceType {
	Sound = 'Sound',
	Speech = 'Speech',
	Subtitle = 'Subtitle',
	Transcription = 'Transcription',
	Video = 'Video',
}

// Sound types
export interface SoundNodeParams {
	
}

// Speech types
export interface SpeechNodeParams {
	
}

// Subtitle types
export interface SubtitleNodeParams {
	
}

// Transcription types
export interface TranscriptionNodeParams {
	
}

// Video types
export interface VideoNodeParams {
	
}

// Common interface for all resource operations
export interface ResourceOperationParams {
	resource: BookolyResourceType;
}

