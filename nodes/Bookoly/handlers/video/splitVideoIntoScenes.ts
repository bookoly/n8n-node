import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function splitVideoIntoScenes(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const interval = ctx.getNodeParameter('interval', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		split: {
			interval,
		},
	};

	Logger.info(`Splitting video into scenes initiated`, {
		videoName: name,
		videoUrl: url,
		interval,
	});

	const response = await apiRequest(ctx, 'POST', 'split-video-into-scenes', body);
	Logger.info(`Video split into scenes successfully`, { response });

	return response;
} 