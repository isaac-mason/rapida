import { useEffect } from '@storybook/client-api';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  Group,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
} from 'three';
import rapida, { World, WorldProvider } from '../../../src';
// @ts-expect-error webpack image import
import cursorImage from '../../resources/cursor.png';
import { BallPitContainer } from './interactive-ball-pit/ball-pit-container.component';
import { Cursor } from './interactive-ball-pit/cursor.component';
import { Spheres } from './interactive-ball-pit/spheres.component';

export default {
  title: 'Physics / Interactive Ball Pit',
};

export const InteractiveBallPit = () => {
  useEffect(() => {
    const R = rapida();

    R.run(({ engine }): World => {
      const world = new World({
        engine,
      });

      const renderer = world.create.renderer.webgl({
        renderer: new WebGLRenderer({
          precision: 'lowp',
          powerPreference: 'high-performance',
        }),
      });

      const physics = world.create.physics({
        gravity: [0, -10, 0],
      });

      const scene = world.create.scene();

      const BACKGROUND = '#89CFF0';
      scene.threeScene.background = new Color(BACKGROUND);

      const camera = world.create.camera({
        camera: new PerspectiveCamera(50, 1, 20, 1000),
      });
      camera.position.set(0, 0, 40);

      const view = renderer.create.view({
        id: 'ball-pit-view',
        camera,
        scene,
      });

      const directionalLightOne = new DirectionalLight(0xffffff, 2);
      directionalLightOne.position.set(50, 50, 25);
      directionalLightOne.castShadow = true;
      directionalLightOne.shadow.mapSize.width = 64;
      directionalLightOne.shadow.camera.left = -10;
      directionalLightOne.shadow.camera.right = 10;
      directionalLightOne.shadow.camera.top = 10;
      directionalLightOne.shadow.camera.bottom = -10;
      directionalLightOne.shadow.mapSize.width = 64;
      directionalLightOne.lookAt(new Vector3(0, 0, 0));
      directionalLightOne.lookAt(0, 0, 0);
      scene.add(directionalLightOne);

      const directionalLightTwo = new DirectionalLight(0xffffff, 0.5);
      directionalLightTwo.position.set(5, -10, 25);
      directionalLightTwo.castShadow = true;
      directionalLightTwo.shadow.mapSize.width = 64;
      directionalLightTwo.shadow.camera.left = -10;
      directionalLightTwo.shadow.camera.right = 10;
      directionalLightTwo.shadow.camera.top = 10;
      directionalLightTwo.shadow.camera.bottom = -10;
      directionalLightTwo.shadow.mapSize.width = 64;
      directionalLightTwo.lookAt(0, 0, 0);
      scene.add(directionalLightTwo);

      const ambientLight = new AmbientLight(0xffffff, 2);
      scene.add(ambientLight);

      scene.threeScene.fog = new Fog('red', 0, 80);

      const space = world.create.space();

      space.create.entity().addComponent(BallPitContainer, { physics });
      space.create.entity().addComponent(Spheres, { physics, scene, view });
      space.create
        .entity()
        .addComponent(Cursor, { physics, camera, view, scene });

      world.on('ready', () => {
        document
          .getElementById('renderer-root')
          .appendChild(renderer.domElement);
      });

      return world;
    });

    return () => R.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }

  #renderer-root #ball-pit-view {
    cursor: url("${cursorImage}")
      39 39,
    auto;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};
