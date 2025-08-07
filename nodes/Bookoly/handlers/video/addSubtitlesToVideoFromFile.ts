import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function addSubtitlesToVideoFromFile(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	// Subtitle parameters
	const type = ctx.getNodeParameter('type', itemIndex) as string;
	const subtitleUrl = ctx.getNodeParameter('subtitle_url', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		subtitle: {
			type,
			url: subtitleUrl,
		},
	};

	Logger.info(`Adding subtitles to video from file initiated`, {
		videoName: name,
		videoUrl: url,
	});

	const response = await apiRequest(ctx, 'POST', 'add-subtitle-to-video-from-file', body);
	Logger.info(`Subtitles from file added to video successfully`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
} 