import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { pollingConfig } from '../config';

export async function getVideo(ctx: IExecuteFunctions, videoId: string): Promise<any> {
	Logger.info(`Waiting for video generation to complete`, { videoId });

	const maxAttempts = pollingConfig.polling.maxAttempts;
	const delayMs = pollingConfig.polling.delayMs;

	if (!videoId) {
		videoId = ctx.getNodeParameter('videoId', 0) as string;
	}

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await apiRequest(ctx, 'GET', `videos/${videoId}`);
		Logger.info(`Bookoly: getVideo--> ${JSON.stringify(response)}`, { response });

		if (response?.state === 'completed') {
			return response;
		} else if (response?.state === 'failed') {
			const error = new NodeOperationError(ctx.getNode(), 'Video operation failed');
			Logger.error(`Video operation failed ${error.message}`, { error });

			throw error;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	const error = new NodeOperationError(
		ctx.getNode(),
		'Timeout while waiting for video generation to finish',
	);

	Logger.error(`Video generation timeout ${error.message}`, { error });

	throw error;
}
