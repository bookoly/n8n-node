import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function extractAudioFromVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
	};

	Logger.info(`Extracting audio from video initiated`, {
		videoName: name,
		videoUrl: url,
	});

	const response = await apiRequest(ctx, 'POST', 'extract-audio-from-video', body);
	Logger.info(`Audio extracted from video successfully`, { response });

	return response;
} 