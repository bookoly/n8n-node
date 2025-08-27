import { IExecuteFunctions } from 'n8n-workflow';
import { bookolyApiRequest } from '../../helpers/apiClient';
import { ApiEndpoints, HttpMethod } from '../../types';

export async function createSpeech(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const text = ctx.getNodeParameter('text', itemIndex) as string;
	const vendor_id = ctx.getNodeParameter('vendor_id', itemIndex) as string;
	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;

	const requestBody = {
		speech: {
			name,
			text,
			webhook_url,
			voice: {
				vendor_id,
			},
		},
	};

	return await bookolyApiRequest(
		ctx,
		HttpMethod.POST,
		ApiEndpoints.TEXT_TO_SPEECH,
		requestBody,
		wait,
	);
}
