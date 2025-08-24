import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { getVideo } from './getVideo';

export async function addWatermarkToVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const watermarkUrl = ctx.getNodeParameter('watermark_url', itemIndex) as string;
	const watermarkPosition = ctx.getNodeParameter('watermarkPosition', itemIndex, {}) as {
		position?: {
			x: number;
			y: number;
		};
	};
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const body = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		watermark: {
			point: {
				x: watermarkPosition.position?.x ?? 0,
				y: watermarkPosition.position?.y ?? 0,
			},
			url: watermarkUrl,
		},
	};

	Logger.info(`Adding watermark to video initiated`, {
		videoName: name,
		videoUrl: url,
		watermarkUrl,
	});

	const response = await apiRequest(ctx, 'POST', 'add-watermark-to-video', body);
	Logger.info(`Watermark added to video successfully`, { response });

	if (wait && response?.id) {
		// Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for video generation to complete ${response.id}`, {
			videoId: response.id, // Use response.id directly
			name,
		});

		return await getVideo(ctx, response.id);
	}

	return response;
}
