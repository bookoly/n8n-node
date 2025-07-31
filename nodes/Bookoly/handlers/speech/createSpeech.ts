import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';
import { waitForSpeech } from './waitForSpeech';

export async function createSpeech(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const text = ctx.getNodeParameter('text', itemIndex) as string;
	const vendor_id = ctx.getNodeParameter('vendor_id', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	
	const body = {
		speech: {
			name,
			text,
			webhook_url,
            voice:{
                vendor_id,
            }
		},
	};

	const response = await apiRequest(ctx, 'POST', 'text-to-speech', body);
	Logger.info(`Speech response received ${JSON.stringify(response)}`,{response});

	const wait = ctx.getNodeParameter('wait', itemIndex, false) as boolean;
	if (wait && response?.id) {  // Check for response.id directly, not response.sound.id
		Logger.info(`Waiting for sound combination to complete ${response.id}`, {
			soundId: response.id,  // Use response.id directly
			name,
		});	
		return await waitForSpeech(ctx, response.id);  // Use waitForSound helper with response.id
	}

	return response;
} 