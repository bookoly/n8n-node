import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { parseJson } from './parseJson';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function createSlideshow(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const resolution = ctx.getNodeParameter('resolution', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	const scenes = parseJson(
		ctx.getNodeParameter('scenes', itemIndex) as string,
		'Video - Scenes (JSON)',
	);

	const requestBody = {
		video: {
			name,
			webhook_url,
			resolution,
			scenes,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.ASSETS_TO_VIDEO,
		requestBody,
		wait,
	);
}
