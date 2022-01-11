import { useEffect } from '@storybook/client-api';
import { Vec3 } from 'cannon-es';
import { BodyType } from '../../../lib';
import { createDebuggerSetup } from '../utils/create-debugger-setup';

export default {
  title: 'Examples / Hinges',
};

export const Hinges = () => {
  useEffect(() => {
    const { renderer, camera, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root').prepend(renderer.domElement);

    // gravity
    physics.gravity = [0, -20, 0];

    // camera
    camera.position.y = 60;
    camera.position.z = 80;
    camera.lookAt(0, 0, 0);

    // create wheels
    const wheelMaterial = {
      friction: 0.5,
      restitution: 0.3,
    };
    const { ref: leftFrontWheel } = physics.create.sphere({
      mass: 1,
      args: 1.2,
      position: [-5, 0, 5],
      material: wheelMaterial,
    });
    const { ref: rightFrontWheel } = physics.create.sphere({
      mass: 1,
      args: 1.2,
      position: [-5, 0, -5],
      material: wheelMaterial,
    });
    const { ref: leftRearWheel } = physics.create.sphere({
      mass: 1,
      args: 1.2,
      position: [5, 0, 5],
      material: wheelMaterial,
    });
    const { ref: rightRearWheel } = physics.create.sphere({
      mass: 1,
      args: 1.2,
      position: [5, 0, -5],
      material: wheelMaterial,
    });

    // create chassis
    const { ref: chassis } = physics.create.box({
      mass: 1,
      args: [5, 0.5, 2],
    });

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
    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -2, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
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
