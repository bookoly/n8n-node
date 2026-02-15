import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function stackVideos(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const secondary_video_url = ctx.getNodeParameter('secondary_video_url', itemIndex) as string;
	const secondary_video_mute = ctx.getNodeParameter(
		'secondary_video_mute',
		itemIndex,
		false,
	) as boolean;

	const layout = ctx.getNodeParameter('layout', itemIndex, 'horizontal') as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		secondary_video: {
			url: secondary_video_url,
			mute: secondary_video_mute,
		},
		stack_option: {
			layout,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.STACK_VIDEOS,
		requestBody,
		wait,
	);
}
