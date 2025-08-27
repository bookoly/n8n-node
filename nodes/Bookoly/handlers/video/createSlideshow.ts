import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { processScenes } from './getScenes';
import { ApiEndpoints, HttpMethod, SceneCollection } from '../../types';

export async function createSlideshow(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const resolution = ctx.getNodeParameter('resolution', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const scenesCollection = ctx.getNodeParameter('scene_collection', itemIndex) as SceneCollection;
	const scenes = processScenes(scenesCollection);

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
