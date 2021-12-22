import { useEffect } from '@storybook/client-api';
import { Color, PerspectiveCamera, WebGLRenderer } from 'three';
import rapida, { World, WorldProvider } from '../../../src';
// @ts-expect-error webpack image import
import cursorImage from '../../resources/cursor.png';
import { BallPitContainer } from './interactive-ball-pit/ball-pit-container.component';
import { Cursor } from './interactive-ball-pit/cursor.component';
import { Lights } from './interactive-ball-pit/lights.component';
import { Spheres } from './interactive-ball-pit/spheres.component';

export default {
  title: 'Physics / Interactive Ball Pit',
};

export const InteractiveBallPit = () => {
  useEffect(() => {
    const R = rapida();

    const worldProvider: WorldProvider = ({ engine }): World => {
      const world = new World({
        engine,
      });

      const renderer = world.create.renderer.webgl({
        renderer: new WebGLRenderer({
          precision: 'lowp',
          powerPreference: 'high-performance',
        }),
      });
      document.getElementById('renderer-root').appendChild(renderer.domElement);

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

      const space = world.create.space();

      space.create.entity({ components: [new Lights({ scene })] });
      space.create.entity({ components: [new BallPitContainer({ physics })] });
      space.create.entity({
        components: [new Spheres({ physics, scene, view })],
      });
      space.create.entity({
        components: [new Cursor({ physics, camera, view, scene })],
      });

      return world;
    };

    R.run(worldProvider);

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
