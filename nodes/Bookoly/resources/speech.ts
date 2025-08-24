import {
	getNameParam,
	getTextParam,
	getWebhookUrlParam,
	getVoiceParam,
	getWaitParam,
	getIdParam,
} from './commonParams';
import { BookolyResourceDefinition, BookolyResourceType } from '../types';
export const speechResource: BookolyResourceDefinition = {
	displayName: 'Speech',
	value: BookolyResourceType.Speech,
	description: 'Manage speech operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [BookolyResourceType.Speech],
				},
			},
			options: [
				{
					name: 'Create a Speech Synthesis',
					value: 'createSpeech',
					action: 'Create a speech synthesis',
					description: 'Synthesizes a text into speech',
				},
				{
					name: 'Get a Specific Speech',
					value: 'getSpeech',
					action: 'Get a speech',
					description: 'Fetches speech data from the API using the speech ID',
				},
			],
			default: 'createSpeech',
		},
	],
	parameters: [
		getIdParam(
			'getSpeech',
			BookolyResourceType.Speech,
			'speechId',
			'Speech ID',
			'The ID of the Speech',
		),
		getNameParam('createSpeech', BookolyResourceType.Speech, 'The name of the speech synthesis'),
		getTextParam(
			'createSpeech',
			BookolyResourceType.Speech,
			true,
			'The text to create the speech synthesis from',
		),
		getVoiceParam('createSpeech', BookolyResourceType.Speech, true, 'The name of the voice'),
		getWaitParam(
			'createSpeech',
			BookolyResourceType.Speech,
			'If enabled, the node will poll the server until the speech is finished and then return the full speech object instead of just the creation response',
		),
		getWebhookUrlParam(
			'createSpeech',
			BookolyResourceType.Speech,
			'webhookUrl',
			'Enter a valid URL to receive webhook notifications. Speech ID and URL will be included.',
		),
	],
};
