import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function addAudioToVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const audioUrl = ctx.getNodeParameter('audio_url', itemIndex) as string;
	const trim = ctx.getNodeParameter('trim', itemIndex, false) as boolean;
	const volume = ctx.getNodeParameter('volume', itemIndex, 100) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
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

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 