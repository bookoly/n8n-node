import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function addWatermarkToVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const watermark_url = ctx.getNodeParameter('watermark_url', itemIndex) as string;
	const x = ctx.getNodeParameter('watermark_point_x', itemIndex, false) as number;
	const y = ctx.getNodeParameter('watermark_point_y', itemIndex, false) as number;
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
				x,
				y,
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
