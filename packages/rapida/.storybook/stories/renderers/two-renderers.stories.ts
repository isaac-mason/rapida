import * as three from 'three';
import {
  Engine,
  World,
  WorldContext,
  WorldProvider,
} from '../../../src';
import { useEffect } from '@storybook/client-api'

export default {
  title: 'Renderers / Two Renderers',
};

export const TwoRenderers = () => {
  useEffect(() => {
    const engine = new Engine();

    const worldId = 'world';

    const worldProvider: WorldProvider = (worldContext: WorldContext): World => {
      const world = new World({
        id: worldId,
        engine: worldContext.engine,
      });

      const rendererOne = world.create.renderer.webgl({ domElementId: 'renderer-root-1' });
      const rendererTwo = world.create.renderer.webgl({ domElementId: 'renderer-root-2' });

      const scene = world.create.scene({ id: 'mainScene' });

      const camera = world.create.camera({ id: 'mainCamera' });
      camera.position.set(0, 0, 500);

      rendererOne.create.view({
        camera,
        scene,
      });

      rendererTwo.create.view({
        camera,
        scene,
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

    engine.registerWorld(worldId, worldProvider);

    engine.startWorld(worldId);

    return () => engine.destroy();
  });

  return `
  <style>
  #renderer-root-1, #renderer-root-2 {
    width: 100%;
    margin-bottom: 1rem;
    height: 20em;
  }
  </style>
  <div id="renderer-root-1"></div>
  <div id="renderer-root-2"></div>
  `;
}
