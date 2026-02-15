import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function overlayVideos(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const overlay_video_url = ctx.getNodeParameter('overlay_video_url', itemIndex) as string;
	const overlay_video_mute = ctx.getNodeParameter(
		'overlay_video_mute',
		itemIndex,
		false,
	) as boolean;

	const position = ctx.getNodeParameter('position', itemIndex, 'center') as string;
	const scale = ctx.getNodeParameter('scale', itemIndex, null) as number | null;
	const x_offset = ctx.getNodeParameter('x_offset', itemIndex, null) as number | null;
	const y_offset = ctx.getNodeParameter('y_offset', itemIndex, null) as number | null;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		overlay_video: {
			url: overlay_video_url,
			mute: overlay_video_mute,
		},
		overlay_option: {
			position,
			...(scale !== null && { scale }),
			...(x_offset !== null && { x_offset }),
			...(y_offset !== null && { y_offset }),
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.OVERLAY_VIDEOS,
		requestBody,
		wait,
	);
}
