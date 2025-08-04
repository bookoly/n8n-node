import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function frameVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const timestamp = ctx.getNodeParameter('timestamp', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		frame: {
			timestamp,
		},
	};

	Logger.info(`Extracting frame from video initiated`, {
		videoName: name,
		videoUrl: url,
		timestamp,
	});

	const response = await apiRequest(ctx, 'POST', 'frame-video', body);
	Logger.info(`Frame extracted from video successfully`, { response });

	return response;
} 