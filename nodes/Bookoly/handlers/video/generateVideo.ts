import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { parseJson } from './parseJson';
import {
	ApiEndpoints,
	ApiVersion,
	FontFamily,
	HttpMethod,
	SubtitlePosition,
	TextCase,
	VideoResolution,
	Voice,
} from '../../types';

export async function generateVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	// Video parameters
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const resolution = ctx.getNodeParameter(
		'resolution',
		itemIndex,
		VideoResolution.HORIZONTAL_HD,
	) as string;
	const duration_basis = ctx.getNodeParameter('duration_basis', itemIndex) as string;
	const scenes = parseJson(
		ctx.getNodeParameter('scenes', itemIndex) as string,
		'Video - Scenes (JSON)',
	);

	// Speech parameters
	const text = ctx.getNodeParameter('text', itemIndex, '') as string;
	const vendor_id = ctx.getNodeParameter('vendor_id', itemIndex, '') as string;

	// Subtitle parameters
	const source = ctx.getNodeParameter('source', itemIndex, 'speech') as string;
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
	const punctuation = ctx.getNodeParameter('punctuation', itemIndex, true) as boolean;
	const text_case = ctx.getNodeParameter('text_base', itemIndex, TextCase.DEFAULT) as string;

	// Audio parameters
	const audio_url = ctx.getNodeParameter('audio_url', itemIndex, '') as string;
	const volume = ctx.getNodeParameter('volume', itemIndex, '') as any;

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			resolution,
			duration_basis,
			webhook_url,
			scenes,
		},
	};

	if (source !== 'none') {
		Object.assign(requestBody, {
			subtitle: {
				source,
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
		});
	}

	if (audio_url || volume) {
		Object.assign(requestBody, {
			audio: {
				url: audio_url,
				volume,
			},
		});
	}

	if (text || (vendor_id && vendor_id !== Voice.NONE)) {
		Object.assign(requestBody, {
			speech: {
				text,
				voice: {
					vendor_id,
				},
			},
		});
	}

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.GENERATE_A_VIDEO,
		requestBody,
		wait,
		ApiVersion.V2,
	);
}
