import { useEffect } from '@storybook/client-api';
import { Vec3 } from 'cannon-es';
import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from 'three';
import { BodyType, Triplet } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'Constraints',
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

export const ConeTwistConstraint = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    // chain handle
    const {
      object: handleObject,
      api: { velocity },
    } = physics.create.sphere(() => ({
      type: BodyType.DYNAMIC,
      args: 0.2,
      mass: 1,
      position: [0, 5, 0],
    }));
    velocity.set(5, 0, 10);

    // chain links
    const chainSize: Triplet = [0.2, 0.2, 0.2];
    const noChainLinks = 20;

    const links = [];
    links.push(handleObject);

    for (let i = 0; i < noChainLinks; i++) {
      const parent = links[links.length - 1];

      const { object } = physics.create.box(() => ({
        mass: 1,
        linearDamping: 0.8,
        args: chainSize,
        type: BodyType.DYNAMIC,
        position: [0, parent.position.y - chainSize[1], 0],
      }));

      physics.create.coneTwistConstraint(parent, object, {
        pivotA: [0, -chainSize[1] / 2, 0],
        pivotB: [0, chainSize[1] / 2, 0],
        axisA: [0, 1, 0],
        axisB: [0, 1, 0],
        twistAngle: 0,
        angle: Math.PI / 8,
      });

      links.push(object);

      // ground
      physics.create.box(() => ({
        type: BodyType.STATIC,
        args: [10, 1, 10],
        position: [0, -3, 0],
        rotation: [0, 0, 0],
      }));
    }

    start();

    return () => {
      destroy();
    };
  }, []);

  return html;
};

export const PointToPointConstraint = () => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const size = 1;
    let mass = 0;
    const space = size * 0.1;

    const N = 10;

    let previous: Object3D = new Object3D();

    for (let i = 0; i < N; i++) {
      // Create a box
      const { object: box } = physics.create.box(() => ({
        mass,
        args: [size, size, size * 0.1],
        position: [0, (N - i) * (size + space * 2) - 6, 0],
        linearDamping: 0.01, // Damping makes the movement slow down with time
        angularDamping: 0.01,
      }));

      if (i !== 0) {
        // Connect the current body to the last one
        // We connect two corner points to each other.
        const { api: right } = physics.create.pointToPointConstraint(box, previous, {
          pivotA: [size, size / 2 + space, 0],
          pivotB: [size, -size / 2 - space, 0],
        });
        const { api: left } = physics.create.pointToPointConstraint(box, previous, {
          pivotA: [-size, size / 2 + space, 0],
          pivotB: [-size, -size / 2 - space, 0],
        });

        // destroy the left constraint after 2s
        setTimeout(() => {
          left.destroy();
        }, 2000);

        // destroy the right constraint after 6s 
        setTimeout(() => {
          right.destroy();
        }, 6000);
      } else {
        // First body is now static. The rest should be dynamic.
        mass = 0.3;
      }

      // To keep track of which body was added last
      previous = box;
    }

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const DistanceConstraint = () => {
  useEffect(() => {
    const { renderer, scene, physics, start, destroy } = createDebuggerSetup({
      cannonWorkerProps: {
        iterations: 10,
      },
    });
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const dist = 1;
    const mass = 1;
    const Nx = 6;
    const Ny = 3;
    const Nz = 3;

    const bodies: { [key: string]: Object3D } = {}; // bodies['i j k'] => particle
    for (let i = 0; i < Nx; i++) {
      for (let j = 0; j < Ny; j++) {
        for (let k = 0; k < Nz; k++) {
          const visual = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial());
          scene.add(visual);

          // Create a new body
          const { object: body } = physics.create.particle(
            () => ({
              mass,
              position: [-dist * i, dist * k + dist * Nz * 0.3 + 1, dist * j],
              velocity: [0, 0, (Math.sin(i * 0.1) + Math.sin(j * 0.1)) * -30],
            }),
            visual,
          );
          bodies[`${i} ${j} ${k}`] = body;
        }
      }
    }

    function connect(
      i1: number,
      j1: number,
      k1: number,
      i2: number,
      j2: number,
      k2: number,
      distance: number,
    ) {
      physics.create.distanceConstraint(bodies[`${i1} ${j1} ${k1}`], bodies[`${i2} ${j2} ${k2}`], {
        distance,
      });
    }

    for (let i = 0; i < Nx; i++) {
      for (let j = 0; j < Ny; j++) {
        for (let k = 0; k < Nz; k++) {
          // normal directions
          if (i < Nx - 1) connect(i, j, k, i + 1, j, k, dist);
          if (j < Ny - 1) connect(i, j, k, i, j + 1, k, dist);
          if (k < Nz - 1) connect(i, j, k, i, j, k + 1, dist);

          // Diagonals
          if (i < Nx - 1 && j < Ny - 1 && k < Nz - 1) {
            // 3d diagonals
            connect(i, j, k, i + 1, j + 1, k + 1, Math.sqrt(3) * dist);
            connect(i + 1, j, k, i, j + 1, k + 1, Math.sqrt(3) * dist);
            connect(i, j + 1, k, i + 1, j, k + 1, Math.sqrt(3) * dist);
            connect(i, j, k + 1, i + 1, j + 1, k, Math.sqrt(3) * dist);
          }

          // 2d diagonals
          if (i < Nx - 1 && j < Ny - 1) {
            connect(i + 1, j, k, i, j + 1, k, Math.sqrt(2) * dist);
            connect(i, j + 1, k, i + 1, j, k, Math.sqrt(2) * dist);
          }
          if (i < Nx - 1 && k < Nz - 1) {
            connect(i + 1, j, k, i, j, k + 1, Math.sqrt(2) * dist);
            connect(i, j, k + 1, i + 1, j, k, Math.sqrt(2) * dist);
          }
          if (j < Ny - 1 && k < Nz - 1) {
            connect(i, j + 1, k, i, j, k + 1, Math.sqrt(2) * dist);
            connect(i, j, k + 1, i, j + 1, k, Math.sqrt(2) * dist);
          }
        }
      }
    }

    // ground
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

export const LockConstraint = () => {
  useEffect(() => {
    const { renderer, scene, physics, start, destroy } = createDebuggerSetup({
      cannonWorkerProps: {
        iterations: 20,
      },
    });
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const size = 0.5;
    const mass = 1;
    const space = size * 0.1;

    const N = 10;
    let previous;
    for (let i = 0; i < N; i++) {
      // Create a box
      const { object: box } = physics.create.box(() => ({
        mass,
        args: [size, size, size],
        position: [-(N - i - N / 2) * (size + 2 * space), size * 6 + space, 0],
      }));

      if (previous) {
        // Connect the current body to the last one
        physics.create.lockConstraint(box, previous, {});
      }

      // To keep track of which body was added last
      previous = box;
    }

    // Create stands
    physics.create.box(() => ({
      mass: 0,
      args: [size, size, size],
      position: [-(-N / 2 + 1) * (size + 2 * space), size * 3, 0],
    }));
    physics.create.box(() => ({
      mass: 0,
      args: [size, size, size],
      position: [-(N / 2) * (size + space * 2), size * 3, 0],
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};

export const Hinges = () => {
  useEffect(() => {
    const { renderer, camera, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    // camera
    camera.position.y = 60;
    camera.position.z = 80;
    camera.lookAt(0, 0, 0);

    // create wheels
    const wheelMaterial = {
      friction: 0.5,
      restitution: 0.3,
    };
    const { object: leftFrontWheel } = physics.create.sphere(() => ({
      mass: 1,
      args: 1.2,
      position: [-5, 0, 5],
      material: wheelMaterial,
    }));
    const { object: rightFrontWheel } = physics.create.sphere(() => ({
      mass: 1,
      args: 1.2,
      position: [-5, 0, -5],
      material: wheelMaterial,
    }));
    const { object: leftRearWheel } = physics.create.sphere(() => ({
      mass: 1,
      args: 1.2,
      position: [5, 0, 5],
      material: wheelMaterial,
    }));
    const { object: rightRearWheel } = physics.create.sphere(() => ({
      mass: 1,
      args: 1.2,
      position: [5, 0, -5],
      material: wheelMaterial,
    }));

    // create chassis
    const { object: chassis } = physics.create.box(() => ({
      mass: 1,
      args: [10, 0.5, 4],
    }));

    // hinge the wheels
    const leftAxis = new Vec3(0, 0, 1);
    const rightAxis = new Vec3(0, 0, -1);
    const leftFrontAxis = new Vec3(-0.3, 0, 0.7);
    const rightFrontAxis = new Vec3(0.3, 0, -0.7);
    leftFrontAxis.normalize();
    rightFrontAxis.normalize();

    const { api: leftFrontWheelApi } = physics.create.hingeConstraint(chassis, leftFrontWheel, {
      pivotA: [-5, 0, 5],
      axisA: [leftFrontAxis.x, leftFrontAxis.y, leftFrontAxis.z],
      pivotB: [0, 0, 0],
      axisB: [leftAxis.x, leftAxis.y, leftAxis.z],
    });

    const { api: rightFrontWheelApi } = physics.create.hingeConstraint(chassis, rightFrontWheel, {
      pivotA: [-5, 0, -5],
      axisA: [rightFrontAxis.x, rightFrontAxis.y, rightFrontAxis.z],
      pivotB: [0, 0, 0],
      axisB: [rightAxis.x, rightAxis.y, rightAxis.z],
    });

    const { api: leftRearWheelApi } = physics.create.hingeConstraint(chassis, leftRearWheel, {
      pivotA: [5, 0, 5],
      axisA: [leftAxis.x, leftAxis.y, leftAxis.z],
      pivotB: [0, 0, 0],
      axisB: [leftAxis.x, leftAxis.y, leftAxis.z],
    });

    const { api: rightRearWheelApi } = physics.create.hingeConstraint(chassis, rightRearWheel, {
      pivotA: [5, 0, -5],
      axisA: [rightAxis.x, leftAxis.y, rightAxis.z],
      pivotB: [0, 0, 0],
      axisB: [rightAxis.x, rightAxis.y, rightAxis.z],
    });

    const constraints = [leftFrontWheelApi, rightFrontWheelApi, leftRearWheelApi, rightRearWheelApi];

    const frontLeftHinge = constraints[2];
    const frontRightHinge = constraints[3];
    frontLeftHinge.enableMotor();
    frontRightHinge.enableMotor();
    const velocity = -14;
    frontLeftHinge.setMotorSpeed(velocity);
    frontRightHinge.setMotorSpeed(-velocity);

    // create plane
    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -2, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
    }));

    start();

    return () => {
      destroy();
    };
  });

  return html;
};
