import {
	getNameParam,
	getTextParam,
	getWebhookUrlParam,
	getVoiceParam,
	getWaitParam,
	getIdParam,
} from './commonParams';
import { ResourceDefinition, ResourceType, SpeechAction } from '../types';

export const speechResource: ResourceDefinition = {
	displayName: 'Speech',
	value: ResourceType.SPEECH,
	description: 'Manage speech operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			default: '',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.SPEECH],
				},
			},
			options: [
				{
					name: 'Create a Speech Synthesis',
					value: SpeechAction.CREATE_SPEECH,
					action: 'Create a speech synthesis',
					description: 'Synthesizes a text into speech',
				},
				{
					name: 'Get a Specific Speech',
					value: SpeechAction.GET_SPEECH,
					action: 'Get a speech',
					description: 'Fetches speech data from the API using the speech ID',
				},
			],
		},
	],
	parameters: [
		getIdParam(
			SpeechAction.GET_SPEECH,
			ResourceType.SPEECH,
			'speechId',
			'Speech ID',
			'The ID of the Speech',
		),
		getNameParam(
			SpeechAction.CREATE_SPEECH,
			ResourceType.SPEECH,
			'The name of the speech synthesis',
		),
		getTextParam(SpeechAction.CREATE_SPEECH, ResourceType.SPEECH),
		getVoiceParam(SpeechAction.CREATE_SPEECH, ResourceType.SPEECH),
		getWaitParam(
			SpeechAction.CREATE_SPEECH,
			ResourceType.SPEECH,
			'If enabled, the node pauses the workflow and checks the server until the speech generation is finished, then returns the full speech object. If disabled, only the ID and creation timestamp are returned.',
		),
		getWebhookUrlParam(
			SpeechAction.CREATE_SPEECH,
			ResourceType.SPEECH,
			'Enter a valid URL to receive webhook notifications. Speech ID and URL will be included.',
		),
	],
};
