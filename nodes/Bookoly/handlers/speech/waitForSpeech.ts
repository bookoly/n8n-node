import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function waitForSpeech(
	ctx: IExecuteFunctions,
	speechId: string,
): Promise<any> {
	const maxAttempts = 5;
	const delayMs = 2000;
	if(!speechId){
		speechId = ctx.getNodeParameter('speechId', 0) as string;
	}
	Logger.info(`Bookoly: waitForSpeech ${speechId}`, {speechId});
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `speeches/${speechId}`);
		Logger.info(`Bookoly: waitForSpeech ${JSON.stringify(response)}`, {response});
		if (response?.state === 'completed') {
			return response;
		}

		await new Promise(resolve => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(ctx.getNode(), 'Timeout while waiting for speech generation to finish');
	Logger.error(`Speech generation timeout ${error.message}`, {error});
	throw error;
} 