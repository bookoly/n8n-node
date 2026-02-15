import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function scaleVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const mode = ctx.getNodeParameter('mode', itemIndex) as string;
	const width = ctx.getNodeParameter('width', itemIndex, null) as number | null;
	const height = ctx.getNodeParameter('height', itemIndex, null) as number | null;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		scale_option: {
			mode,
			...(width !== null && { width }),
			...(height !== null && { height }),
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.SCALE_A_VIDEO,
		requestBody,
		wait,
	);
}
