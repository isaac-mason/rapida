import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../../lib';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Examples / Spring',
};

export const Spring = () => {
  useEffect(() => {
    const { renderer, camera, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    // gravity
    physics.gravity = [0, -20, 0];

    // camera
    camera.position.y = 0;
    camera.position.z = 10;
    camera.lookAt(0, 0, 0);

    // create a static sphere
    const { ref: sphere } = physics.create.sphere({
      args: 0.1,
      type: BodyType.STATIC,
    });

    // create a box
    const { ref: box } = physics.create.box({
      args: [1, 1, 1 * 0.3],
      mass: 5,
    });

    // create the spring between the static sphere and the box
    physics.create.spring(sphere, box, {
      localAnchorA: [0, 0, 0],
      localAnchorB: [0, 0, 0],
      restLength: 0,
      stiffness: 80,
      damping: 1,
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
