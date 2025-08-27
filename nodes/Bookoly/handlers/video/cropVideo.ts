import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod, ResourceType } from '../../types';

export async function cropVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const x = ctx.getNodeParameter('x', itemIndex) as number;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const y = ctx.getNodeParameter('y', itemIndex) as number;
	const width = ctx.getNodeParameter('width', itemIndex) as number;
	const height = ctx.getNodeParameter('height', itemIndex) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			url,
			webhook_url,
			mute,
		},
		crop_option: {
			point: {
				x,
				y,
			},
			width,
			height,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.CROP_A_VIDEO,
		ResourceType.VIDEO,
		requestBody,
		wait,
	);
}
