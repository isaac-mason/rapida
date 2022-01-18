import { useEffect } from '@storybook/client-api';
import * as CANNON from 'cannon-es';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { BodyType, ShapeType, Triplet } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'Body Subscription',
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

export const BodySubscription = () => {
  useEffect(() => {
    const { renderer, scene, physics, start, destroy } = createDebuggerSetup();
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    const { api } = physics.create.box(() => ({
      type: BodyType.DYNAMIC,
      position: [0, 0, 0],
      args: [1, 1, 1],
      mass: 1,
      ...paramsToFlingUp,
    }));

    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    scene.add(mesh);
    
    api.position.subscribe(([x, y, z]) => {
      mesh.position.set(x + 5, y, z);
      console.log('here');
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

  return html;
};
