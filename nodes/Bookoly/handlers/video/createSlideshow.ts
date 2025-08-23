import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';
import { processScenes } from './getScenes';

export async function createSlideshow(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const resolution = ctx.getNodeParameter('resolution', itemIndex) as string;

	// Get scenes collection
	const scenesCollection = ctx.getNodeParameter('scenes', itemIndex, {}) as any;

	// Process scenes using the shared function
	const scenes = processScenes(scenesCollection);

	const body = {
		video: {
			name,
			webhook_url,
			resolution,
			scenes: scenes,
		},
	};

	Logger.info(`Creating slideshow initiated: ${JSON.stringify(body)}`, {
		slideshowName: name,
		sceneCount: scenes.length,
		resolution,
	});

	const response = await apiRequest(ctx, 'POST', 'assets-to-video', body);
	Logger.info(`Slideshow created successfully: ${JSON.stringify(response)}`, { response });

	if (wait && response?.id) {
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,
			name,
		});
		return await waitForVideoGeneration(ctx, response.id);
	}
	return response;
}
