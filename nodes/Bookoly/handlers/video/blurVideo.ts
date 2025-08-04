import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function blurVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const x = ctx.getNodeParameter('x', itemIndex) as number;
	const y = ctx.getNodeParameter('y', itemIndex) as number;
	const width = ctx.getNodeParameter('width', itemIndex) as number;
	const height = ctx.getNodeParameter('height', itemIndex) as number;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		blur: {
			x,
			y,
			width,
			height,
		},
	};

	Logger.info(`Blurring video initiated`, {
		videoName: name,
		videoUrl: url,
		blurArea: { x, y, width, height },
	});

	const response = await apiRequest(ctx, 'POST', 'blur-video', body);
	Logger.info(`Video blurred successfully`, { response });

	return response;
} 