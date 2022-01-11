import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../../lib';
import { createDebuggerSetup } from '../utils/create-debugger-setup';

export default {
  title: 'Examples / Box',
};

export const Box = ({ gravity }: { gravity: { x: number; y: number; z: number } }) => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = 0;
    camera.lookAt(0, -1, 0);

    physics.gravity = [gravity.x, gravity.y, gravity.z];

    physics.create.box(
      {
        type: BodyType.DYNAMIC,
        args: [1, 1, 1],
        mass: 1,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        velocity: [Math.random() - 2, 8, Math.random()],
        angularVelocity: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
        fixedRotation: false,
        allowSleep: false,
      },
    );

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

Box.args = {
  gravity: { x: 0, y: -10, z: 0 },
}
