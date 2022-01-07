import { useEffect } from '@storybook/client-api';
import { Camera } from 'three';
import { BodyType } from '../../../lib';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Examples / Trigger',
};

export const Trigger = () => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    camera.position.z = 30;
    camera.position.y = 3;

    physics.gravity = [0, -10, 0];

    // create a sphere rolling towards the trigger
    const sphereRadius = 1;
    const { api: sphereApi } = physics.create.sphere(
      {
        args: sphereRadius,
        mass: 1,
        position: [-5, 0, 0],
      },
    );
    sphereApi.applyLocalImpulse([5.5, 0, 0], [0, sphereRadius, 0]);

    // create the trigger
    physics.create.box({
      args: [2, 2, 5],
      position: [5, 0, 0],
      isTrigger: true,
      onCollide: (event) => {
        console.log(event);
      },
    });

    // create a plane for the sphere to roll on
    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -sphereRadius, 0],
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
