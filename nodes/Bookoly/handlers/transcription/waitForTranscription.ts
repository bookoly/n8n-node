import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { pollingConfig } from '../config';

export async function waitForTranscription(
	ctx: IExecuteFunctions,
	transcriptId: string,
): Promise<any> {
	const maxAttempts = pollingConfig.polling.maxAttempts;
	const delayMs = pollingConfig.polling.delayMs;
	if(!transcriptId){
		transcriptId = ctx.getNodeParameter('transcriptId', 0) as string;
	}
	Logger.info(`Bookoly: waitForTranscription ${transcriptId}`, {transcriptId});
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `transcripts/${transcriptId}`);
		Logger.info(`Bookoly: waitForTranscription ${JSON.stringify(response)}`, {response});
		if (response?.state === 'completed') {
			return response;
		}

		await new Promise(resolve => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(ctx.getNode(), 'Timeout while waiting for speech generation to finish');
	Logger.error(`Speech generation timeout ${error.message}`, {error});
	throw error;
} 