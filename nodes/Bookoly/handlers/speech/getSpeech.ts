import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { pollingConfig } from '../config';

export async function getSpeech(ctx: IExecuteFunctions, speechId: string): Promise<any> {
	const maxAttempts = pollingConfig.polling.maxAttempts;
	const delayMs = pollingConfig.polling.delayMs;
	if (!speechId) {
		speechId = ctx.getNodeParameter('speechId', 0) as string;
	}
	Logger.info(`bookoly: getSpeech ${speechId}`, { speechId });
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `speeches/${speechId}`);
		Logger.info(`bookoly: getSpeech ${JSON.stringify(response)}`, { response });
		if (response?.state === 'completed') {
			return response;
		} else if (response?.state === 'failed') {
			const error = new NodeOperationError(ctx.getNode(), 'Speech generation failed');
			Logger.error(`Speech generation failed ${error.message}`, { error });
			throw error;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(
		ctx.getNode(),
		'Timeout while waiting for speech generation to finish',
	);
	Logger.error(`Speech generation timeout ${error.message}`, { error });
	throw error;
}
