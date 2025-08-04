import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function generateVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const description = ctx.getNodeParameter('description', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			description,
			webhook_url,
		},
	};

	Logger.info(`Generating video initiated`, {
		videoName: name,
		description,
	});

	const response = await apiRequest(ctx, 'POST', 'generate-video', body);
	Logger.info(`Video generation initiated successfully`, { response });

	return response;
} 