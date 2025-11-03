import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod, TextCase } from '../../types';

export async function addSubtitlesToVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
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
	const punctuation = ctx.getNodeParameter('punctuation', itemIndex, true) as boolean;
	const text_case = ctx.getNodeParameter('text_base', itemIndex, TextCase.DEFAULT) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
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
			punctuation,
			text_case,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.ADD_SUBTITLE_TO_VIDEO,
		requestBody,
		wait,
	);
}
