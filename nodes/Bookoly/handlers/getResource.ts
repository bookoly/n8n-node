import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { bookolyApiRequest } from '../helpers/apiClient';
import { ApiEndpoints, HttpMethod, ResourceState, ResourceType } from '../types';
import { APP_BASE_URL } from '../Bookoly.node';

export async function getResource(
	ctx: IExecuteFunctions,
	itemIndex: number,
	resourceId: string,
): Promise<any> {
	const maxAttempts = 60;
	const delay = 5000; // In milliseconds

	const resourceType = ctx.getNodeParameter('resource', itemIndex) as ResourceType;

	if (!resourceId) {
		// Case: When polling the server for process completion
		resourceId = getResourceId(ctx, itemIndex, resourceType);
	}

	for (let attempt: number = 0; attempt < maxAttempts; attempt++) {
		const response: any = await bookolyApiRequest(
			ctx,
			HttpMethod.GET,
			getEndpoint(resourceId, resourceType),
		);

		const responseState = response?.state;

		if (responseState === ResourceState.COMPLETED) {
			return response;
		} else if (responseState === ResourceState.FAILED) {
			const url = getResourceUrl(resourceId, resourceType);

			throw new NodeOperationError(
				ctx.getNode(),
				`Resource creation failed. For more details, please check the bookoly activities at: ${url}`,
			);
		}

		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	throw new NodeOperationError(
		ctx.getNode(),
		'Timeout while waiting for resource generation to finish',
	);
}

function getResourceId(
	ctx: IExecuteFunctions,
	itemIndex: number,
	resourceType: ResourceType,
): string {
	let parameterName = null;

	switch (resourceType) {
		case ResourceType.VIDEO:
			parameterName = 'videoId';
			break;
		case ResourceType.SPEECH:
			parameterName = 'speechId';
			break;
		case ResourceType.TRANSCRIPT:
			parameterName = 'transcriptId';
			break;
		case ResourceType.SOUND:
			parameterName = 'soundId';
			break;
		case ResourceType.FILE:
			parameterName = 'subtitleFileId';
			break;
	}

	return ctx.getNodeParameter(parameterName, itemIndex) as string;
}

function getEndpoint(resourceId: string, resourceType: ResourceType): string {
	let endpoint = null;

	switch (resourceType) {
		case ResourceType.VIDEO:
			endpoint = ApiEndpoints.VIDEOS;
			break;
		case ResourceType.SPEECH:
			endpoint = ApiEndpoints.SPEECHES;
			break;
		case ResourceType.TRANSCRIPT:
			endpoint = ApiEndpoints.TRANSCRIPTS;
			break;
		case ResourceType.SOUND:
			endpoint = ApiEndpoints.SOUNDS;
			break;
		case ResourceType.FILE:
			endpoint = ApiEndpoints.SUBTITLE_FILES;
			break;
	}

	return `${endpoint}/${resourceId}`;
}

function getResourceUrl(resourceId: string, resourceType: ResourceType): string {
	let endpoint = null;

	switch (resourceType) {
		case ResourceType.VIDEO:
			endpoint = ApiEndpoints.VIDEOS;
			break;
		case ResourceType.SPEECH:
			endpoint = ApiEndpoints.SPEECHES;
			break;
		case ResourceType.TRANSCRIPT:
			endpoint = ApiEndpoints.TRANSCRIPTS;
			break;
		case ResourceType.SOUND:
			endpoint = ApiEndpoints.SOUNDS;
			break;
		case ResourceType.FILE:
			endpoint = ApiEndpoints.SUBTITLE_FILES;
			break;
	}

	return `${APP_BASE_URL}/${endpoint}/${resourceId}`;
}
