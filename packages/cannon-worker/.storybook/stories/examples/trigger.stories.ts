import { useEffect } from '@storybook/client-api';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial } from 'three';
import { BodyType } from '../../../lib';
import { createDebuggerSetup } from '../utils/create-debugger-setup';

export default {
  title: 'Examples / Trigger',
};

export const Trigger = () => {
  useEffect(() => {
    const { camera, scene, renderer, physics, start, destroy } = createDebuggerSetup();

    document.getElementById('renderer-root').prepend(renderer.domElement);

    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 30;

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

    // set the scene background color
    scene.background = new Color('#003');

    // create the trigger
    const triggerMesh = new Mesh(new BoxGeometry(2, 2, 5), new MeshBasicMaterial({ color: '#500' }));
    scene.add(triggerMesh);

    physics.create.three({
      three: triggerMesh,
      position: [5, 0, 0],
      isTrigger: true,
      onCollideBegin: (event) => {
        console.log(event);

        // change the scene background color
        scene.background = new Color('#010');
      },
      onCollideEnd: (event) => {
        console.log(event);

        // change the scene background color
        scene.background = new Color('#003');
      },
      onCollide: (event) => {
        console.log(event);

        // change the trigger mesh color
        triggerMesh.material.color = new Color('#050');
      },
    }, {
      ref: triggerMesh,
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
