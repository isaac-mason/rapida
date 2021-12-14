import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../../lib/next';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Shapes / Cylinder',
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
    const { renderer, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    physics.gravity = [0, -10, 0];

    physics.create.cylinder({
      type: BodyType.DYNAMIC,
      radiusTop,
      radiusBottom,
      height,
      numSegments,
      mass: 1,
      position: [0, 75, 0],
      rotation: [0, 0, 0],
      velocity: [Math.random(), 10, Math.random()],
      angularVelocity: [0.5, 0.2, 0.3],
      fixedRotation: false,
      allowSleep: false,
    });

    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -10, 0],
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
  radiusTop: 20,
  radiusBottom: 1,
  height: 100,
  numSegments: 10,
};
