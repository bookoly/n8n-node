import { IDataObject, IExecuteFunctions, IHttpRequestOptions, LoggerProxy as Logger } from 'n8n-workflow';
import { BASE_URL } from '../Bookoly.node';
Logger.info(`BASE_URL: ${BASE_URL}`);
export async function apiRequest(
	ctx: IExecuteFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	endpoint: string,
	body?: IDataObject,
	qs?: IDataObject,
	authentication = 'bookolyApi',
): Promise<any> {
	Logger.info(`apiRequest: ${BASE_URL}/${endpoint.replace(/^\//, '')}`);
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
