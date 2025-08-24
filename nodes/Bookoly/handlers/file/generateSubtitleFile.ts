import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { getSubtitleFile } from './getSubtitleFile';

export async function generateSubtitleFile(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const type = ctx.getNodeParameter('type', itemIndex, 'ass') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
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
		subtitle: {
			name,
			type,
			url,
			webhook_url,
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
	Logger.info(`Subtitle file generation body ${JSON.stringify(body)}`, { body });
	const response = await apiRequest(ctx, 'POST', 'generate-subtitle-file', body);
	Logger.info(`Subtitle file generation initiated ${JSON.stringify(response)}`, { response });

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	if (wait && response?.id) {
		Logger.info(`Waiting for subtitle file generation to complete ${response.id}`, {
			subtitleFileId: response.id,
			name,
		});

		return await getSubtitleFile(ctx, response.id);
	}

	return response;
}
