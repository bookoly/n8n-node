import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function createTranscript(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const src = ctx.getNodeParameter('src', itemIndex) as string;
	const language = ctx.getNodeParameter('language', itemIndex) as string;
	const translation_language = ctx.getNodeParameter('translationLanguage', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		transcript: {
			name,
			src,
			language,
			translation_language,
			webhook_url,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.CREATE_TRANSCRIPT,
		requestBody,
		wait,
	);
}
