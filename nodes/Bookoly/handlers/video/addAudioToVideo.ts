import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod, ResourceType } from '../../types';

export async function addAudioToVideo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const url = ctx.getNodeParameter('url', itemIndex) as string;
	const mute = ctx.getNodeParameter('mute', itemIndex, false) as boolean;
	const audio_url = ctx.getNodeParameter('audio_url', itemIndex) as string;
	const trim = ctx.getNodeParameter('trim', itemIndex, false) as boolean;
	const volume = ctx.getNodeParameter('volume', itemIndex, 100) as number;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		video: {
			name,
			url,
			mute,
			webhook_url,
		},
		audio: {
			url: audio_url,
			trim,
			volume,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.ADD_AUDIO_TO_VIDEO,
		ResourceType.VIDEO,
		requestBody,
		wait,
	);
}
