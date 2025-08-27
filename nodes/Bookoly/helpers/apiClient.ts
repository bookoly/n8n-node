import { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { API_V1_BASE_URL } from '../Bookoly.node';
import { HttpMethod, ResourceType } from '../types';
import { getVideo } from '../handlers/video/getVideo';
import { getSpeech } from '../handlers/speech/getSpeech';
import { getTranscript } from '../handlers/transcript/getTranscript';
import { getSound } from '../handlers/sound/getSound';
import { getSubtitleFile } from '../handlers/file/getSubtitleFile';

export async function bookolyApiRequest(
	ctx: IExecuteFunctions,
	method: HttpMethod,
	endpoint: string,
	resourceType: ResourceType,
	body?: IDataObject,
	wait?: boolean,
	qs?: IDataObject,
	authentication = 'bookolyApi',
): Promise<any> {
	const options: IHttpRequestOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		url: `${API_V1_BASE_URL}/${endpoint}`,
		json: true,
	};

	try {
		const response = await ctx.helpers.requestWithAuthentication.call(ctx, authentication, options);

		const resourceId = response?.id;

		if (wait && resourceId) {
			switch (resourceType) {
				case ResourceType.VIDEO:
					return getVideo(ctx, resourceId);
				case ResourceType.SPEECH:
					return getSpeech(ctx, resourceId);
				case ResourceType.TRANSCRIPT:
					return getTranscript(ctx, resourceId);
				case ResourceType.SOUND:
					return getSound(ctx, resourceId);
				case ResourceType.FILE:
					return getSubtitleFile(ctx, resourceId);
			}
		}

		return response;
	} catch (error) {
		// Create a new error with the description as the message
		const apiError = new Error(error.description || error.message || 'The api request failed');

		// Preserve the original error properties
		Object.assign(apiError, {
			statusCode: error.statusCode,
			description: error.description,
			context: error.context,
		});

		throw apiError;
	}
}
