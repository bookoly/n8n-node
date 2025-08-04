import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function waitForVideoGeneration(
	ctx: IExecuteFunctions,
	videoId: string,
): Promise<any> {
	Logger.info(`Waiting for video generation to complete`, { videoId });

	let attempts = 0;
	const maxAttempts = 60; // 5 minutes with 5-second intervals
	const interval = 5000; // 5 seconds

	while (attempts < maxAttempts) {
		try {
			const response = await apiRequest(ctx, 'GET', `video/${videoId}`);
			
			if (response.status === 'completed') {
				Logger.info(`Video generation completed successfully`, { 
					videoId, 
					attempts,
					response 
				});
				return response;
			} else if (response.status === 'failed') {
				Logger.error(`Video generation failed`, { 
					videoId, 
					attempts,
					response 
				});
				throw new Error(`Video generation failed: ${response.error || 'Unknown error'}`);
			}

			Logger.info(`Video generation still in progress`, { 
				videoId, 
				attempts,
				status: response.status 
			});

			attempts++;
			await new Promise(resolve => setTimeout(resolve, interval));
		} catch (error) {
			Logger.error(`Error checking video generation status`, { 
				videoId, 
				attempts,
				error: error.message 
			});
			throw error;
		}
	}

	throw new Error(`Video generation timed out after ${maxAttempts} attempts`);
} 