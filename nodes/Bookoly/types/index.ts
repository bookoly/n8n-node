import { IHttpRequestMethods, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// Resource types enum
export enum BookolyResourceType {
	Sound = 'Sound',
	// Speech = 'Speech',
	// Subtitle = 'Subtitle',
	// Transcription = 'Transcription',
	// Video = 'Video',
}

// Operation interface
export interface OperationOption extends INodePropertyOptions {
	description: string;
	routing: {
		request: {
			method: IHttpRequestMethods; // Changed from string
			url: string;
		};
	};
}

// Resource definition interface
export interface BookolyResourceDefinition {
	displayName: string;
	value: BookolyResourceType;
	description: string;
	operations: INodeProperties[]; // Changed from custom type to INodeProperties
	parameters: INodeProperties[];
}

