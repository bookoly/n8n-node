import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { getTranscript } from './getTranscript';

export async function createTranscription(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const src = ctx.getNodeParameter('src', itemIndex) as string;
	const language = ctx.getNodeParameter('language', itemIndex) as string;
	const translationLanguage = ctx.getNodeParameter('translationLanguage', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		transcript: {
			name,
			src,
			language,
			translation_language: translationLanguage,
			webhook_url,
		},
	};

	const response = await apiRequest(ctx, 'POST', 'create-transcript', body);
	Logger.info(`Transcript response received ${JSON.stringify(response)}`, { response });

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	if (wait && response?.id) {
		// Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for transcript generation to complete ${response.id}`, {
			transcriptId: response.id, // Use response.id directly
			name,
		});

		return await getTranscript(ctx, response.id);
	}

	return response;
}
