import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForSound } from './waitForSound';

export async function createSoundEffect(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;

	const body = {
		sound: {
			name,
			webhook_url: ctx.getNodeParameter('webhook_url', itemIndex, '') as string,
			effect_text: ctx.getNodeParameter('effect_text', itemIndex) as string,
			effect_duration: ctx.getNodeParameter('effect_duration', itemIndex, 0.5) as number,
		},
	};

	const response = await apiRequest(ctx, 'POST', 'create-sound-effect', body);

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	if (wait && response?.id) {
		return await waitForSound(ctx, response.id);
	}

	return response;
} 