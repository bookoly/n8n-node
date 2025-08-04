import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function clipVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const startTime = ctx.getNodeParameter('startTime', itemIndex) as number;
	const duration = ctx.getNodeParameter('duration', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		clip: {
			start_time: startTime,
			duration,
		},
	};

	Logger.info(`Clipping video initiated`, {
		videoName: name,
		videoUrl: url,
		startTime,
		duration,
	});

	const response = await apiRequest(ctx, 'POST', 'clip-video', body);
	Logger.info(`Video clipped successfully`, { response });

	return response;
} 