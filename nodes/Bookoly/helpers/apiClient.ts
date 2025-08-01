import { IExecuteFunctions, IHttpRequestOptions, IDataObject } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';

export const BASE_URL = 'https://bookoly.com/api/v1';

export async function apiRequest(
	ctx: IExecuteFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	endpoint: string,
	body?: IDataObject,
	qs?: IDataObject,
	authentication = 'bookolyApi',
): Promise<any> {
	const options: IHttpRequestOptions = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		url: `${BASE_URL}/${endpoint.replace(/^\//, '')}`,
		json: true,
	};

	try {
		const response = await ctx.helpers.requestWithAuthentication.call(ctx, authentication, options);
		return response;
	} catch (error) {
			Logger.error('API request failed', {
				endpoint,
				method,
				error: error.message,
				status: error.statusCode,
		});
		throw error;
	}
} 