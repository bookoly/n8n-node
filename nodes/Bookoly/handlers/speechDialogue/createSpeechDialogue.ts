import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';
import { parseJson } from '../video/parseJson';

export async function createSpeechDialogue(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const segments = parseJson(
		ctx.getNodeParameter('segments', itemIndex) as string,
		'Speech Dialogue - Segments (JSON)',
	);
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		speech_dialogue: {
			name,
			segments,
			webhook_url,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.CREATE_SPEECH_DIALOGUE,
		requestBody,
		wait,
	);
}
