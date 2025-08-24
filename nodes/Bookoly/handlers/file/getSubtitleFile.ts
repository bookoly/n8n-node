import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { pollingConfig } from '../config';

export async function getSubtitleFile(
	ctx: IExecuteFunctions,
	subtitleFileId: string,
): Promise<any> {
	const maxAttempts = pollingConfig.polling.maxAttempts;
	const delayMs = pollingConfig.polling.delayMs;
	if (!subtitleFileId) {
		subtitleFileId = ctx.getNodeParameter('subtitleFileId', 0) as string;
	}
	Logger.info(`Bookoly: getSubtitleFile ${subtitleFileId}`, { subtitleFileId });
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `subtitleFiles/${subtitleFileId}`);
		Logger.info(`Bookoly: getSubtitleFile ${JSON.stringify(response)}`, { response });
		if (response?.state === 'completed') {
			return response;
		} else if (response?.state === 'failed') {
			const error = new NodeOperationError(ctx.getNode(), 'Subtitle file generation failed');
			Logger.error(`Subtitle file generation failed ${error.message}`, { error });
			throw error;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(
		ctx.getNode(),
		'Timeout while waiting for subtitle file generation to finish',
	);
	Logger.error(`Subtitle file generation timeout ${error.message}`, { error });
	throw error;
}
