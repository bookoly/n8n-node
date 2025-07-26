import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BookolyApi implements ICredentialType {
	name = 'bookolyApi';
	displayName = 'Bookoly API';
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
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
				'Authorization': 'Bearer {{$credentials.apiToken}}',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		},
	};

	// Credential test block
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: 'https://bookoly.com/api/v1/auth-check',
			headers: {
				'Authorization': 'Bearer {{$credentials.apiToken}}',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		},
	};
}