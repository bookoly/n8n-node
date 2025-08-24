import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { getSound } from './getSound';

export async function combineSounds(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const segments = ((ctx.getNodeParameter('segmentList', itemIndex) as any).segmentValues ||
		[]) as Array<{ src: string }>;

	const body = {
		sound: {
			name,
			webhook_url: ctx.getNodeParameter('webhook_url', itemIndex, '') as string,
			segments: segments.map((s) => ({ src: s.src })),
		},
	};

	const response = await apiRequest(ctx, 'POST', 'combine-sounds', body);
	Logger.info(`Combine sounds response received ${JSON.stringify(response)}`, { response });

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	if (wait && response?.id) {
		// Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for sound combination to complete ${response.id}`, {
			soundId: response.id, // Use response.id directly
			name,
		});

		return await getSound(ctx, response.id);
	}

	return response;
}
