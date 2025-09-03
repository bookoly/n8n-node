import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { parseScenes } from './parseScenes';
import {
	ApiEndpoints,
	FontFamily,
	HttpMethod,
	SubtitlePosition,
	VideoResolution,
} from '../../types';

export async function generateVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	// Video parameters
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const resolution = ctx.getNodeParameter(
		'resolution',
		itemIndex,
		VideoResolution.HORIZONTAL_HD,
	) as string;
	const scenes = parseScenes(ctx.getNodeParameter('scenes', itemIndex) as string);

	// Speech parameters
	const text = ctx.getNodeParameter('text', itemIndex, '') as string;
	const vendor_id = ctx.getNodeParameter('vendor_id', itemIndex, '') as string;

	// Subtitle parameters
	const style = ctx.getNodeParameter('style', itemIndex, 'simple') as string;
	const language = ctx.getNodeParameter('language', itemIndex, 'af') as string;
	const font_family = ctx.getNodeParameter('font_family', itemIndex, FontFamily.ARIAL) as string;
	const font_size = ctx.getNodeParameter('font_size', itemIndex, 1) as number;
	const word_color = ctx.getNodeParameter('word_color', itemIndex, '') as string;
	const line_color = ctx.getNodeParameter('line_color', itemIndex, '') as string;
	const line_words = ctx.getNodeParameter('line_words', itemIndex, 1) as number;
	const outline_width = ctx.getNodeParameter('outline_width', itemIndex, 1) as number;
	const position = ctx.getNodeParameter(
		'position',
		itemIndex,
		SubtitlePosition.MID_BOTTOM_CENTER,
	) as string;
	const ltr = ctx.getNodeParameter('ltr', itemIndex, true) as boolean;

	// Audio parameters
	const audio_url = ctx.getNodeParameter('audio_url', itemIndex, '') as string;
	const trim = ctx.getNodeParameter('trim', itemIndex, true) as boolean;
	const volume = ctx.getNodeParameter('volume', itemIndex, 1) as number;

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			resolution,
			webhook_url,
			scenes,
		},
		speech: {
			text,
			voice: {
				vendor_id,
			},
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
		audio: {
			url: audio_url,
			trim,
			volume,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.GENERATE_A_VIDEO,
		requestBody,
		wait,
	);
}
