import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../../lib';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Examples / Gravity',
};

export const Gravity = ({ gravity }: { gravity: { x: number; y: number; z: number } }) => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    physics.gravity = [gravity.x, gravity.y, gravity.z];

    physics.create.box(
      {
        type: BodyType.DYNAMIC,
        args: [20, 20, 20],
        mass: 1,
        position: [0, 75, 0],
        rotation: [0, 0, 0],
        velocity: [Math.round(Math.random() * 4) - 2, 50, Math.round(Math.random() * 4) - 2],
        angularVelocity: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
        fixedRotation: false,
        allowSleep: false,
      },
    );

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

Gravity.args = {
  gravity: { x: 0, y: -10, z: 0 },
}
