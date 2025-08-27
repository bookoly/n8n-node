import { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { API_V1_BASE_URL } from '../Bookoly.node';
import { HttpMethod } from '../types';
import { getResource } from '../handlers/getResource';

export async function bookolyApiRequest(
	ctx: IExecuteFunctions,
	method: HttpMethod,
	endpoint: string,
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
			// Not sure if value 0 is correct here!
			return getResource(ctx, 0, resourceId);
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
