import { BookolyScene, SceneCollection } from '../../types';

export function processScenes(scenesCollection: SceneCollection): BookolyScene[] {
	const scenes: BookolyScene[] = [];

	if (scenesCollection && scenesCollection.scene && Array.isArray(scenesCollection.scene)) {
		for (const scene of scenesCollection.scene) {
			if (scene && typeof scene === 'object') {
				const bookolyScene: BookolyScene = {
					asset: {
						src: scene.src,
						type: scene.type,
					},
					effect: scene.effect,
					duration: scene.duration,
				};

				scenes.push(bookolyScene);
			}
		}
	}

	return scenes;
}
