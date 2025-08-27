import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function combineSounds(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const urls = ((ctx.getNodeParameter('audioList', itemIndex) as any).urls || []) as Array<{
		src: string;
	}>;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		sound: {
			name,
			webhook_url,
			segments: urls.map((s) => ({ src: s.src })),
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.COMBINE_SOUNDS,
		requestBody,
		wait,
	);
}
