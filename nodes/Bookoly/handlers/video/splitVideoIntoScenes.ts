import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function splitVideoIntoScenes(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, true) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	// Split options
	const type = ctx.getNodeParameter('type', itemIndex, 'auto') as string;
	const amount = ctx.getNodeParameter('amount', itemIndex, 1) as number;
	const min_duration = ctx.getNodeParameter('min_duration', itemIndex, 0.1) as number;
	const max_duration = ctx.getNodeParameter('max_duration', itemIndex, 0.1) as number;
	const scene_change_threshold = ctx.getNodeParameter('scene_change_threshold', itemIndex, 0.1) as number;

	const body = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		split_option: {
			type,
			amount,
			min_duration,
			max_duration,
			scene_change_threshold,
		},
	};

	Logger.info(`Splitting video into scenes initiated: ${JSON.stringify(body)}`, {
		videoName: name,
		videoUrl: url,
		mute,
		type,
		amount,
	});

	const response = await apiRequest(ctx, 'POST', 'split-video-into-scenes', body);
	Logger.info(`Video split into scenes successfully: ${JSON.stringify(response)}`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 