import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function waitForSound(
	ctx: IExecuteFunctions,
	soundId: string,
): Promise<any> {
	const maxAttempts = 5;
	const delayMs = 2000;
	if(!soundId){
		soundId = ctx.getNodeParameter('soundId', 0) as string;
	}
	Logger.info(`Bookoly: waitForSound ${soundId}`, {soundId});
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `sounds/${soundId}`);
		Logger.info(`Bookoly: waitForSound ${JSON.stringify(response)}`, {response});
		if (response?.state === 'completed') {
			return response;
		}

		await new Promise(resolve => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(ctx.getNode(), 'Timeout while waiting for sound generation to finish');
	Logger.error(`Sound generation timeout ${error.message}`, {error});
	throw error;
} 