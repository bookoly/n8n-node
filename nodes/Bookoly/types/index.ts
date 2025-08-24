import { INodeProperties } from 'n8n-workflow';

// Resource types enum
export enum BookolyResourceType {
	Sound = 'Sound',
	Speech = 'Speech',
	File = 'File',
	Transcription = 'Transcription',
	Video = 'Video',
}

// Resource definition interface
export interface BookolyResourceDefinition {
	displayName: string;
	value: BookolyResourceType;
	description: string;
	operations: INodeProperties[]; // Changed from custom type to INodeProperties
	parameters: INodeProperties[];
}
