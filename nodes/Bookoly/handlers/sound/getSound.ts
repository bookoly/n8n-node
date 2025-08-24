import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { pollingConfig } from '../config';

export async function getSound(ctx: IExecuteFunctions, soundId: string): Promise<any> {
	const maxAttempts = pollingConfig.polling.maxAttempts;
	const delayMs = pollingConfig.polling.delayMs;
	if (!soundId) {
		soundId = ctx.getNodeParameter('soundId', 0) as string;
	}
	Logger.info(`bookoly: getSound ${soundId}`, { soundId });
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `sounds/${soundId}`);
		Logger.info(`bookoly: getSound ${JSON.stringify(response)}`, { response });
		if (response?.state === 'completed') {
			return response;
		} else if (response?.state === 'failed') {
			const error = new NodeOperationError(ctx.getNode(), 'Sound operation failed');
			Logger.error(`Sound operation failed ${error.message}`, { error });
			throw error;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(
		ctx.getNode(),
		'Timeout while waiting for Sound operation to finish',
	);
	Logger.error(`Sound operation timeout ${error.message}`, { error });
	throw error;
}
