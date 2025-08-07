import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function cropVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const x = ctx.getNodeParameter('x', itemIndex) as number;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const y = ctx.getNodeParameter('y', itemIndex) as number;
	const width = ctx.getNodeParameter('width', itemIndex) as number;
	const height = ctx.getNodeParameter('height', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const body = {
		video: {
			name,
			url,
			webhook_url,
			mute,
		},
		crop_option: {
			point: {
				x,
				y,
			},
			width,
			height,
		},
	};

	Logger.info(`Cropping video initiated`, {
		videoName: name,
		videoUrl: url,
		cropArea: { x, y, width, height },
	});

	const response = await apiRequest(ctx, 'POST', 'crop-a-video', body);
	Logger.info(`Video cropped successfully`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 