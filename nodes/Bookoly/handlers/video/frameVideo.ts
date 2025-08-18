import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function frameVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const seconds = ctx.getNodeParameter('seconds', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		frame: {
			seconds,
		},
	};

	Logger.info(`Extracting frame from video initiated:$`, {body});

	const response = await apiRequest(ctx, 'POST', 'frame-a-video', body);
	Logger.info(`Frame extracted from video successfully: ${JSON.stringify(response)}`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 