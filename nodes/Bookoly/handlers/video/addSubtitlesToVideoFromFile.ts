import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function addSubtitlesToVideoFromFile(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	// Subtitle parameters
	const style = ctx.getNodeParameter('style', itemIndex) as string;
	const language = ctx.getNodeParameter('language', itemIndex) as string;
	const font_family = ctx.getNodeParameter('font_family', itemIndex) as string;
	const font_size = ctx.getNodeParameter('font_size', itemIndex) as number;
	const word_color = ctx.getNodeParameter('word_color', itemIndex, '') as string;
	const line_color = ctx.getNodeParameter('line_color', itemIndex, '') as string;
	const line_words = ctx.getNodeParameter('line_words', itemIndex) as number;
	const outline_width = ctx.getNodeParameter('outline_width', itemIndex) as number;
	const position = ctx.getNodeParameter('position', itemIndex) as string;
	const ltr = ctx.getNodeParameter('ltr', itemIndex) as boolean;

	const body = {
		video: {
			name,
			url,
			webhook_url,
		},
		subtitle: {
			style,
			language,
			font_family,
			font_size,
			word_color,
			line_color,
			line_words,
			outline_width,
			position,
			ltr,
		},
	};

	Logger.info(`Adding subtitles to video from file initiated`, {
		videoName: name,
		videoUrl: url,
	});

	const response = await apiRequest(ctx, 'POST', 'add-subtitles-to-video-from-file', body);
	Logger.info(`Subtitles from file added to video successfully`, { response });

	return response;
} 