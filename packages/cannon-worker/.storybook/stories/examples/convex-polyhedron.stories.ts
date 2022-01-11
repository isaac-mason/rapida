import { useEffect } from '@storybook/client-api';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BodyType, Triplet } from '../../../lib';
import { createDebuggerSetup } from '../utils/create-debugger-setup';

export default {
  title: 'Examples / Convex Polyhedron',
};

export const ConvexPolyhedron = () => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    camera.position.x = 5;
    camera.position.z = 20;
    camera.position.y = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    physics.gravity = [0, -10, 0];

    const vertices: Triplet[] = [
      [0, 0, 0],
      [2, 0, 0],
      [0, 2, 0],
      [0, 0, 2],
    ];

    const offset = -0.35;
    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      v[0] += offset;
      v[1] += offset;
      v[2] += offset;
    }

    for (let i = 0; i < 5; i++) {
      physics.create.convexPolyhedron({
        mass: 1,
        position: [0.1 * i, 3 * i, 0.25 * i],
        args: [
          vertices,
          [
            [0, 3, 2], // -x
            [0, 1, 3], // -y
            [0, 2, 1], // -z
            [1, 2, 3], // +xyz
          ],
        ],
      });
    }

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
