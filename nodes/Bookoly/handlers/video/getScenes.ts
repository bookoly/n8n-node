export function processScenes(scenesCollection: any): any[] {

	const scenes = [];

	if (scenesCollection && scenesCollection.scene && Array.isArray(scenesCollection.scene)) {

		for (const scene of scenesCollection.scene) {

			if (scene && typeof scene === 'object') {

				const sceneObj: any = {
					asset: {
						src: scene.src,
						type: scene.type,
					},
				};

				if (scene.effect !== 'none') {
					sceneObj.effect = scene.effect;
				}

				// Only include duration for image assets
				if (scene.type === 'image') {
					sceneObj.duration = scene.duration;
				}

				scenes.push(sceneObj);
			}
		}
	}

	return scenes;
}
