import { useEffect } from '@storybook/client-api';
import { Color, PerspectiveCamera } from 'three';
import { Runtime, World, WorldProvider } from '../../../src';
import { BallPitContainer } from './physics-ball-pit/ball-pit-container.component';
import { Cursor } from './physics-ball-pit/cursor.component';
import { Lights } from './physics-ball-pit/lights.component';
import { Spheres } from './physics-ball-pit/spheres.component';

// @ts-expect-error webpack image import
import cursorImage from '../../resources/cursor.png';

export default {
  title: 'Examples / Physics Ball Pit',
};

export const Default = () => {
  useEffect(() => {
    const runtime = new Runtime({
      domId: 'renderer-root',
      debug: true,
    });

    const worldId = 'FallingCubes';

    const worldProvider: WorldProvider = (worldContext): World => {
      const world = new World({
        id: worldId,
        runtime: worldContext.runtime,
      });

      const physics = world.create.physics({
        gravity: [0, -30, 0],
      });

      const scene = world.create.scene();

      const BACKGROUND = '#89CFF0';
      scene.threeScene.background = new Color(BACKGROUND);

      const camera = world.create.camera({
        camera: new PerspectiveCamera(50, 1, 20, 1000),
      });
      camera.position.set(0, 0, 40);

      const view = world.create.view({
        camera,
        scene,
      });

      const space = world.create.space();

      space.create.entity({ components: [new Lights({ scene })] });
      space.create.entity({ components: [new BallPitContainer({ physics })] });
      space.create.entity({
        components: [new Spheres({ physics, scene, view })],
      });
      space.create.entity({
        components: [new Cursor({ physics, camera, view })],
      });

      return world;
    };

    runtime.registerWorld(worldId, worldProvider);

    runtime.startWorld(worldId);

    return () => runtime.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }

  #renderer-root canvas {
    cursor: url("${cursorImage}")
      39 39,
    auto;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};
