import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function clipVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const start = ctx.getNodeParameter('start', itemIndex) as number;
	const duration = ctx.getNodeParameter('duration', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const body = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		clip_option: {
			start,
			duration,
		},
	};

	Logger.info(`Clipping video initiated`);

	const response = await apiRequest(ctx, 'POST', 'clip-a-video', body);
	Logger.info(`Video clipped successfully`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 