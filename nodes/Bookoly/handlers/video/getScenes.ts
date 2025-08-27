import { BookolyScene, Scene, SceneCollection } from '../../types';

export function processScenes(scenesCollection: SceneCollection): BookolyScene[] {
	const bookolyScenes: BookolyScene[] = [];

	const scenes: Scene[] = scenesCollection?.scenes;

	if (scenes && Array.isArray(scenes)) {
		for (const scene of scenes) {
			if (scene && typeof scene === 'object') {
				const bookolyScene: BookolyScene = {
					asset: {
						src: scene.src,
						type: scene.type,
					},
					effect: scene.effect,
					duration: scene.duration,
				};

				bookolyScenes.push(bookolyScene);
			}
		}
	}

	return bookolyScenes;
}
