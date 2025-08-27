import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod, ResourceType } from '../../types';

export async function blurVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const x = ctx.getNodeParameter('x', itemIndex) as number;
	const y = ctx.getNodeParameter('y', itemIndex) as number;
	const box_width = ctx.getNodeParameter('box_width', itemIndex) as number;
	const box_height = ctx.getNodeParameter('box_height', itemIndex) as number;
	const power = ctx.getNodeParameter('power', itemIndex) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		blur_option: {
			point: {
				x,
				y,
			},
			box_width,
			box_height,
			power,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.BLUR_A_VIDEO,
		ResourceType.VIDEO,
		requestBody,
		wait,
	);
}
