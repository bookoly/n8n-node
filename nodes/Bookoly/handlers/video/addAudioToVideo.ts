import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function addAudioToVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const audioUrl = ctx.getNodeParameter('audioUrl', itemIndex) as string;
	const trim = ctx.getNodeParameter('trim', itemIndex, false) as boolean;
	const volume = ctx.getNodeParameter('volume', itemIndex, 100) as number;

	const body = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		audio: {
			url: audioUrl,
			trim,
			volume,
		},
	};

	Logger.info(`Adding audio to video initiated`, {
		videoName: name,
		videoUrl: url,
		audioUrl,
	});

	const response = await apiRequest(ctx, 'POST', 'add-audio-to-video', body);
	Logger.info(`Audio added to video successfully`, { response });

	return response;
} 