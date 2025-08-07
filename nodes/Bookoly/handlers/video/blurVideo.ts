import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function blurVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const x = ctx.getNodeParameter('x', itemIndex) as number;
	const y = ctx.getNodeParameter('y', itemIndex) as number;
	const box_width = ctx.getNodeParameter('box_width', itemIndex) as number;
	const box_height = ctx.getNodeParameter('box_height', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const power = ctx.getNodeParameter('power', itemIndex) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const body = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		blur_option: {
			point:{
				x,
				y,
			},
			box_width,
			box_height,
			power,
		},
	};

	Logger.info(`Blurring video initiated`);

	const response = await apiRequest(ctx, 'POST', 'blur-a-video', body);
	Logger.info(`Video blurred successfully`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 