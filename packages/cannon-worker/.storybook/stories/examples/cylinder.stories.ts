import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../../lib';
import { createDebuggerSetup } from '../utils/create-debugger-setup';

export default {
  title: 'Examples / Cylinder',
};

export const Cylinder = ({
  radiusTop,
  radiusBottom,
  height,
  numSegments,
}: {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  numSegments: number;
}) => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    physics.gravity = [0, -10, 0];

    physics.create.cylinder({
      type: BodyType.DYNAMIC,
      args: [radiusTop, radiusBottom, height, numSegments],
      mass: 1,
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      velocity: [Math.random(), 10, Math.random()],
      angularVelocity: [0.5, 0.2, 0.3],
      fixedRotation: false,
      allowSleep: false,
    });

    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    });

    start();

    return () => {
      destroy();
    };
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};

Cylinder.args = {
  radiusTop: 1,
  radiusBottom: 1,
  height: 2,
  numSegments: 50,
};
