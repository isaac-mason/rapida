import { useEffect } from '@storybook/client-api';
import { createBasicSetup } from '../utils/create-basic-setup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  title: 'Examples / Heightfield',
};

export const Heightfield = () => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createBasicSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 20, 30)
    camera.lookAt(0, 0, 0);

    physics.gravity = [0, -10, 0];

    // Create a matrix of height values
    const matrix = [];
    const sizeX = 20;
    const sizeZ = 20;
    for (let i = 0; i < sizeX; i++) {
      matrix.push([]);
      for (let j = 0; j < sizeZ; j++) {
        if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeZ - 1) {
          const height = 3;
          matrix[i].push(height);
          continue;
        }

        const height = Math.cos((i / sizeX) * Math.PI * 2) * Math.cos((j / sizeZ) * Math.PI * 2) + 2;
        matrix[i].push(height);
      }
    }

    // create the heightfield
    const elementSize = 1;
    const api = physics.create.heightfield({
      args: [matrix, { elementSize }],
      mass: 0,
      position: [-((sizeX - 1) * elementSize) / 2, -4, ((sizeZ - 1) * elementSize) / 2],
      rotation: [-Math.PI / 2, 0, 0],
    });

    // add spheres
    for (let i = 0; i < sizeX - 1; i++) {
      for (let j = 0; j < sizeZ - 1; j++) {
        if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeZ - 2) {
          continue;
        }

        physics.create.sphere({
          args: 0.1,
          mass: 1,
          position: [(i + 0.25) - (sizeX / 2), -1, (-j + 0.25) + (sizeZ / 2)],
        });
      }
    }

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
