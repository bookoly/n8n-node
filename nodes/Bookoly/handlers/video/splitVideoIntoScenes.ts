import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function splitVideoIntoScenes(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, true) as boolean;
	const type = ctx.getNodeParameter('type', itemIndex, 'auto') as string;
	const amount = ctx.getNodeParameter('amount', itemIndex, 2) as number;
	const min_duration = ctx.getNodeParameter('min_duration', itemIndex, 1) as number;
	const max_duration = ctx.getNodeParameter('max_duration', itemIndex, 2) as number;
	const scene_change_threshold = ctx.getNodeParameter(
		'scene_change_threshold',
		itemIndex,
		0.2,
	) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		split_option: {
			type,
			amount,
			min_duration,
			max_duration,
			scene_change_threshold,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.SPLIT_VIDEO_INTO_SCENES,
		requestBody,
		wait,
	);
}
