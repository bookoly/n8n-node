import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForVideoGeneration } from './waitForVideoGeneration';

export async function generateVideo(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const resolution = ctx.getNodeParameter('resolution', itemIndex, 'horizontal_hd') as string;
	const scenesCollection = ctx.getNodeParameter('scenes', itemIndex, {}) as any;

	// Speech parameters
	const speechText = ctx.getNodeParameter('text', itemIndex, '') as string;
	const voiceVendorId = ctx.getNodeParameter('vendor_id', itemIndex, '') as string;

	// Subtitle parameters
	const subtitleStyle = ctx.getNodeParameter('style', itemIndex, 'simple') as string;
	const subtitleLanguage = ctx.getNodeParameter('language', itemIndex, 'af') as string;
	const fontFamily = ctx.getNodeParameter('font_family', itemIndex, 'Arial') as string;
	const fontSize = ctx.getNodeParameter('font_size', itemIndex, 1) as number;
	const wordColor = ctx.getNodeParameter('word_color', itemIndex, '') as string;
	const lineColor = ctx.getNodeParameter('line_color', itemIndex, '') as string;
	const lineWords = ctx.getNodeParameter('line_words', itemIndex, 1) as number;
	const outlineWidth = ctx.getNodeParameter('outline_width', itemIndex, 1) as number;
	const subtitlePosition = ctx.getNodeParameter('position', itemIndex, 'mid_bottom_center') as string;
	const ltr = ctx.getNodeParameter('ltr', itemIndex, true) as boolean;

	// Audio parameters
	const audioUrl = ctx.getNodeParameter('audio_url', itemIndex, '') as string;
	const trim = ctx.getNodeParameter('trim', itemIndex, true) as boolean;
	const volume = ctx.getNodeParameter('volume', itemIndex, 1) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

// Process scenes
const scenes = [];
	if (scenesCollection && scenesCollection.scene && Array.isArray(scenesCollection.scene)) {
		for (const scene of scenesCollection.scene) {
			if (scene && typeof scene === 'object') {
				const sceneObj: any = {
					asset:
						{
							src: scene.src,
							type: scene.type,
						},
				};

				if (scene.effect !== 'none') {
					sceneObj.effect = scene.effect;
				}

				// Only include duration for image assets
				if (scene.type === 'image') {
					sceneObj.duration = scene.duration;
				}

				scenes.push(sceneObj);
			}
		}
	}
	const body = {
		video: {
			name,
			resolution,
			webhook_url,
			scenes: scenes,
		},
		speech: {
			text: speechText,
			voice: {
				vendor_id: voiceVendorId,
			},
		},
		subtitle: {
			style: subtitleStyle,
			language: subtitleLanguage,
			font_family: fontFamily,
			font_size: fontSize,
			word_color: wordColor,
			line_color: lineColor,
			line_words: lineWords,
			outline_width: outlineWidth,
			position: subtitlePosition,
			ltr,
		},
		audio: {
			url: audioUrl,
			trim,
			volume,
		},
	};

	Logger.info(`Generating video initiated: ${JSON.stringify(body)}`);

	const response = await apiRequest(ctx, 'POST', 'generate-a-video', body);
	Logger.info(`Video generation initiated successfully`, { response });

	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id,  // Use response.id directly
			name,
		});
		return await waitForVideoGeneration(ctx, response.id);  // Use waitForSound helper with response.id
	}
	return response;
}
