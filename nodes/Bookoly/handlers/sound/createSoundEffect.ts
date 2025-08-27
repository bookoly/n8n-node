import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod, ResourceType } from '../../types';

export async function createSoundEffect(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;

	const requestBody = {
		sound: {
			name,
			webhook_url: ctx.getNodeParameter('webhook_url', itemIndex, '') as string,
			effect_text: ctx.getNodeParameter('effect_text', itemIndex) as string,
			effect_duration: ctx.getNodeParameter('effect_duration', itemIndex, 1) as number,
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.CREATE_SOUND_EFFECT,
		ResourceType.SOUND,
		requestBody,
		wait,
	);
}
