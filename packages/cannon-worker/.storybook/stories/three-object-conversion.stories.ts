import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BodyType } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'Examples / Three Object Conversion',
};

export const ThreeObjectConversion = () => {
  useEffect(() => {
    const { camera, renderer, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    camera.position.x = -3;
    camera.position.y = 2;
    camera.position.z = 10;
    camera.lookAt(0, 1, 0);

    new OrbitControls(camera, renderer.domElement);
    
    physics.gravity = [0, -10, 0];    

    physics.create.three({
      three: (() => {
        const geo = new three.BoxGeometry(1, 1, 1);
        const mat = new three.MeshBasicMaterial();
        return new three.Mesh(geo, mat);
      })(),
      mass: 1,
      position: [1, 0, 0],
      velocity: [Math.random() * 1 - 0.5, 5, Math.random() * 1 - 0.5],
      angularVelocity: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
    });

    physics.create.three({
      three: (() => {
        const geo = new three.SphereGeometry(.3);
        const mat = new three.MeshBasicMaterial();
        return new three.Mesh(geo, mat);
      })(),
      mass: 1,
      position: [0, 0, 0],
      velocity: [Math.random() * 1 - 0.5, 5, Math.random() * 1 - 0.5],
      angularVelocity: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
    });

    physics.create.three({
      three: (() => {
        const geo = new three.CylinderGeometry(.3, .3, 0.5);
        const mat = new three.MeshBasicMaterial();
        return new three.Mesh(geo, mat);
      })(),
      mass: 1,
      position: [-1, 0, 0],
      velocity: [Math.random() * 1 - 0.5, 5, Math.random() * 1 - 0.5],
      angularVelocity: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
    });

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
