import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function rotateVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const angle = ctx.getNodeParameter('angle', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		rotate: {
			angle,
		},
	};

	Logger.info(`Rotating video initiated`, {
		videoName: name,
		videoUrl: url,
		angle,
	});

	const response = await apiRequest(ctx, 'POST', 'rotate-video', body);
	Logger.info(`Video rotated successfully`, { response });

	return response;
} 