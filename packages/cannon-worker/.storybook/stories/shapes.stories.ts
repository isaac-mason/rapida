import { useEffect } from '@storybook/client-api';
import * as CANNON from 'cannon-es';
import { BodyType, ShapeType, Triplet } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'Shapes',
};

const html = `
<style>
#renderer-root {
  width: 100%;
  height: 100%;
}
</style>
<div id="renderer-root"></div>
`;

const paramsToFlingUp: {
  velocity: Triplet;
  angularVelocity: Triplet;
} = {
  velocity: [Math.random() - 2, 8, Math.random()],
  angularVelocity: [Math.random() * 3 - 1.5, Math.random() * 5 - 2.5, Math.random() * 3 - 1.5],
};

export const Box = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    physics.create.box(() => ({
      type: BodyType.DYNAMIC,
      args: [1, 1, 1],
      mass: 1,
      ...paramsToFlingUp,
    }));

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const Sphere = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    physics.create.sphere(() => ({
      type: BodyType.DYNAMIC,
      args: 1,
      mass: 1,
      ...paramsToFlingUp,
    }));

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const Cylinder = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    physics.create.cylinder(() => ({
      type: BodyType.DYNAMIC,
      args: [1, 1, 2.5, 20],
      mass: 1,
      ...paramsToFlingUp,
    }));

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const ConvexPolyhedron = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

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
      physics.create.convexPolyhedron(() => ({
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
      }));
    }

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const CompoundBody = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const { api: chairApi } = physics.create.compoundBody(() => ({
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
    }));

    chairApi.applyLocalImpulse([15, 0, 10], [0, 0.75, 0]);

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const Heightfield = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    // Create a matrix of height values
    const matrix: number[][] = [];
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
    const api = physics.create.heightfield(() => ({
      args: [matrix, { elementSize }],
      mass: 0,
      position: [-((sizeX - 1) * elementSize) / 2, -4, ((sizeZ - 1) * elementSize) / 2],
      rotation: [-Math.PI / 2, 0, 0],
    }));

    // add spheres
    for (let i = 0; i < sizeX - 1; i++) {
      for (let j = 0; j < sizeZ - 1; j++) {
        if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeZ - 2) {
          continue;
        }

        physics.create.sphere(() => ({
          args: 0.1,
          mass: 1,
          position: [i + 0.25 - sizeX / 2, -1, -j + 0.25 + sizeZ / 2],
        }));
      }
    }

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const Trimesh = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const torusShape = CANNON.Trimesh.createTorus(1, 0.5, 16, 16);

    physics.create.trimesh(() => ({
      type: BodyType.DYNAMIC,
      args: [torusShape.vertices, torusShape.indices],
      mass: 1,
    }));

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

// todo: create particles cloth example once support for constraints is added
// https://github.com/pmndrs/cannon-es/blob/master/examples/threejs_cloth.html
