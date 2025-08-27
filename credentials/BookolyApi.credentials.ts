import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { API_V1_BASE_URL } from '../nodes/Bookoly/Bookoly.node';
import { ApiEndpoints, HttpMethod } from '../nodes/Bookoly/types';

export class BookolyApi implements ICredentialType {
	name: string = 'bookolyApi';
	displayName: string = 'Bookoly API';
	documentationUrl: string = 'https://bookoly.com/app/docs/v1/api#/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: API_V1_BASE_URL,
			url: ApiEndpoints.AUTH_CHECK,
			method: HttpMethod.POST,
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
	};
}
