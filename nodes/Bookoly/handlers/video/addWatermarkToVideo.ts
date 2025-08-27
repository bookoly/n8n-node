import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function addWatermarkToVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const watermark_url = ctx.getNodeParameter('watermark_url', itemIndex) as string;
	const watermark_position = ctx.getNodeParameter('watermarkPosition', itemIndex, {}) as {
		position?: {
			x: number;
			y: number;
		};
	};
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		watermark: {
			point: {
				x: watermark_position.position?.x ?? 0,
				y: watermark_position.position?.y ?? 0,
			},
			url: watermark_url,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.ADD_WATERMARK_TO_VIDEO,
		requestBody,
		wait,
	);
}
