import { useEffect } from '@storybook/client-api';
import { BodyType, PhysicsDebugger, Triplet } from '../../../lib';
import { createBasicSetup } from '../utils/create-basic-setup';

export default {
  title: 'Examples / Chain',
};

export const Chain = () => {
  useEffect(() => {
    const { renderer, camera, scene, physics, loop, start, destroy } = createBasicSetup();
    const debug = new PhysicsDebugger(physics, { scene });
    loop.push(() => debug.update());
    document.getElementById('renderer-root').prepend(renderer.domElement);

    // gravity
    physics.gravity = [0, -20, 0];
  
    // camera
    camera.position.y = 60;
    camera.position.z = 100;
    camera.lookAt(0, 0, 0);

    // chain handle
    const [handleRef, { velocity }] = physics.create.sphere({
      type: BodyType.DYNAMIC,
      radius: 1,
      mass: 1,
      position: [0, 60, 0],
    });
    velocity.set(10, 280, 20);

    // chain links
    const chainSize: Triplet = [0.5, 2, 0.5]
    const noChainLinks = 14;
    
    const links = [];
    links.push(handleRef);
    
    for (let i = 0; i < noChainLinks; i++) {
      const parent = links[links.length - 1];

      const [ref] = physics.create.box({
        mass: 1,
        linearDamping: 0.8,
        size: chainSize,
        type: BodyType.DYNAMIC,
        position: [0, parent.position.y - (chainSize[1] + 1), 0],
      })
  
      physics.create.coneTwistConstraint(parent, ref, {
        pivotA: [0, -chainSize[1] / 2, 0],
        pivotB: [0, chainSize[1] / 2, 0],
        axisA: [0, 1, 0],
        axisB: [0, 1, 0],
        twistAngle: 0,
        angle: Math.PI / 8,
      });

      links.push(ref);
    }

    // ground
    physics.create.box({
      type: BodyType.STATIC,
      size: [100, 1, 100],
      position: [0, -10, 0],
      rotation: [0, 0, 0],
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
