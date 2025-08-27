import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function clipVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const start = ctx.getNodeParameter('start', itemIndex) as number;
	const duration = ctx.getNodeParameter('duration', itemIndex) as number;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		clip_option: {
			start,
			duration,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.CLIP_A_VIDEO,
		requestBody,
		wait,
	);
}
