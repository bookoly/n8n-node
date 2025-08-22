import { IDataObject, IExecuteFunctions, IHttpRequestOptions, LoggerProxy as Logger } from 'n8n-workflow';

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
		return await ctx.helpers.requestWithAuthentication.call(ctx, authentication, options);
	} catch (error) {
		Logger.error(`API request failed:${JSON.stringify(error)}`, {
			endpoint,
			method,
			error: error.message,
			status: error.statusCode,
		});

		// Create a new error with the description as the message
		const apiError = new Error(error.description || error.message || 'API request failed');
		// Preserve the original error properties
		Object.assign(apiError, {
			statusCode: error.statusCode,
			description: error.description,
			context: error.context,
		});
		throw apiError;
	}
}
