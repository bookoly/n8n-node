import { IExecuteFunctions } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiClient';

export async function createSlideshow(
	ctx: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex, '') as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex, '') as string;
	
	// Get scenes collection
	const scenesCollection = ctx.getNodeParameter('scenes', itemIndex, {}) as any;
	
	// Process scenes
	const scenes = [];
	if (scenesCollection && typeof scenesCollection === 'object') {
		for (const [sceneData] of Object.entries(scenesCollection)) {
			if (sceneData && typeof sceneData === 'object') {
				const scene = sceneData as any;
				scenes.push({
					effect: scene.effect || 'zoom_in',
					duration: scene.duration || 1,
					asset: [
						{
							src: scene.src || '',
							type: scene.type || 'image',
						},
					],
				});
			}
		}
	}

	const body = {
		slideshow: {
			name,
			webhook_url,
			scene: scenes,
		},
	};

	Logger.info(`Creating slideshow initiated`, {
		slideshowName: name,
		sceneCount: scenes.length,
	});

	const response = await apiRequest(ctx, 'POST', 'create-slideshow', body);
	Logger.info(`Slideshow created successfully`, { response });

	return response;
} 