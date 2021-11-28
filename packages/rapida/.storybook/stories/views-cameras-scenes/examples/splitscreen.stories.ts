import * as three from 'three';
import {
  Runtime,
  World,
  WorldContext,
  WorldProvider,
  OrbitControls,
} from '../../../../src';
import { useEffect } from '@storybook/client-api'

// @ts-expect-error mdx import
import docs from '../1-view.stories.mdx';

export default {
  title: 'Views & Cameras & Scenes / Splitscreen',
  parameters: {
    docs: {
      page: docs, 
    }
  }
};

export const Example = () => {
  useEffect(() => {
    const runtime = new Runtime({
      domId: 'renderer-root-2',
    });

    const worldId = 'SpinningCube';

    const worldProvider: WorldProvider = (worldContext: WorldContext): World => {
      const world = new World({
        id: worldId,
        runtime: worldContext.runtime,
      });

      const scene = world.create.scene({ id: 'mainScene' });

      const camera = world.create.camera();
      camera.position.set(0, 0, 500);
      camera.setControls(new OrbitControls({ target: [0, 0, 0] }));

      world.create.view({
        camera,
        scene,
        viewport: {
          top: 0,
          left: 0,
          width: 0.5,
          height: 1,
        },
        scissor: {
          top: 0,
          left: 0,
          width: 0.5,
          height: 1,
        }
      });

      world.create.view({
        camera,
        scene,
        viewport: {
          top: 0,
          left: 0.5,
          width: 0.5,
          height: 1,
        },
        scissor: {
          top: 0,
          left: 0.5,
          width: 0.5,
          height: 1,
        }
      });

      const ambientLight = new three.AmbientLight(0xffffff, 1);
      ambientLight.position.set(0, -20, 40);
      ambientLight.lookAt(new three.Vector3(0, 0, 0));
      scene.add(ambientLight);

      const geometry = new three.BoxGeometry(50, 50, 50);
      const material = new three.MeshPhongMaterial({
        color: 'blue',
        specular: 0x111111,
        shininess: 30,
      });
      const cube = new three.Mesh(geometry, material);
      cube.position.set(0, 0, 0);
  
      scene.add(cube);

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
    height: 20em;
  }
  </style>
  <div id="renderer-root-2"></div>
  `;
}
