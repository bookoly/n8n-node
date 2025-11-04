import { getIdParam, getNameParam, getWaitParam, getWebhookUrlParam } from './commonParams';
import { ResourceDefinition, ResourceType, SpeechDialogueAction } from '../types';

export const speechDialogueResource: ResourceDefinition = {
	displayName: 'Speech Dialogue',
	value: ResourceType.SPEECH_DIALOGUE,
	description: 'Manage speech dialogue operations',
	operations: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [ResourceType.SPEECH_DIALOGUE],
				},
			},
			options: [
				{
					name: 'Create a Speech Dialogue',
					value: SpeechDialogueAction.CREATE_SPEECH_DIALOGUE,
					action: 'Create a speech dialogue',
					description: 'Generate a conversation between multiple AI voices from text',
				},
				{
					name: 'Get a Specific Speech Dialogue',
					value: SpeechDialogueAction.GET_SPEECH_DIALOGUE,
					action: 'Get a speech dialogue',
					description: 'Fetches speech dialogue data from the API using the speech dialogue ID',
				},
			],
			default: 'createSpeechDialogue',
		},
	],
	parameters: [
		getIdParam(
			SpeechDialogueAction.GET_SPEECH_DIALOGUE,
			ResourceType.SPEECH_DIALOGUE,
			'speechDialogueId',
			'Speech Dialogue ID',
			'The ID of the Speech Dialogue',
		),
		getNameParam(
			SpeechDialogueAction.CREATE_SPEECH_DIALOGUE,
			ResourceType.SPEECH_DIALOGUE,
			'The name of the speech dialogue',
		),
		{
			displayName: 'Speech Dialogue - Segments (JSON)',
			name: 'segments',
			type: 'json',
			displayOptions: {
				show: { operation: [SpeechDialogueAction.CREATE_SPEECH_DIALOGUE] },
			},
			default:
				'[\n' +
				'  {\n' +
				'    "text": "Hello there!",\n' +
				'    "voice": {\n' +
				'      "vendor_id": "echo"\n' +
				'    }\n' +
				'  },\n' +
				'  {\n' +
				'    "text": "How are you today?",\n' +
				'    "voice": {\n' +
				'      "vendor_id": "alloy"\n' +
				'    }\n' +
				'  }\n' +
				']',
			description:
				'Add multiple dialogue segments in JSON format. Each segment should include text and a voice with a vendor_id. You can find available vendor_id values under Voices at bookoly.com',
		},
		getWaitParam(
			SpeechDialogueAction.CREATE_SPEECH_DIALOGUE,
			ResourceType.SPEECH_DIALOGUE,
			'If enabled, the node pauses the workflow and checks the server until the speech dialogue generation is finished, then returns the full speech dialogue object. If disabled, only the ID and creation timestamp are returned.',
		),
		getWebhookUrlParam(
			SpeechDialogueAction.CREATE_SPEECH_DIALOGUE,
			ResourceType.SPEECH_DIALOGUE,
			'Enter a valid URL to receive webhook notifications. Speech Dialogue ID and URL will be included.',
		),
	],
};
