import { useEffect } from '@storybook/client-api';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BodyType, CompoundBodyParams, ShapeType } from '../../../lib';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Examples / Compound Shape',
};

export const CompoundShape = () => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    camera.position.y = 5;
    camera.position.z = 12;
    camera.lookAt(0, 0, 0);

    physics.gravity = [0, -10, 0];

    const { api: chairApi } = physics.create.compoundBody({
      mass: 1,
      position: [-3, 4, 0],
      shapes: [
        { type: ShapeType.Box, mass: 1, position: [0, 0, 0], args: [1.5, 1.5, 0.25] },
        { type: ShapeType.Box, mass: 1, position: [0, -1.75, 1.25], args: [1.5, 0.25, 1.5] },
        { type: ShapeType.Box, mass: 10, position: [5 + -6.25, -3.5, 0], args: [0.25, 1.5, 0.25] },
        { type: ShapeType.Box, mass: 10, position: [5 + -3.75, -3.5, 0], args: [0.25, 1.5, 0.25] },
        { type: ShapeType.Box, mass: 10, position: [5 + -6.25, -3.5, 2.5], args: [0.25, 1.5, 0.25] },
        { type: ShapeType.Box, mass: 10, position: [5 + -3.75, -3.5, 2.5], args: [0.25, 1.5, 0.25] },
      ],
    });

    chairApi.applyLocalImpulse([30, 0, 20], [0, 0.75, 0]);

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
