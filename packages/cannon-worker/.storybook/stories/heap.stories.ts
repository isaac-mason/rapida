import { useEffect } from '@storybook/client-api';
import { BodyType } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'Heap',
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

export const Heap = ({ cubes }: { cubes: number }) => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup({
      cannonWorkerProps: {
        size: cubes + 100,
      },
      camera: {
        position: [0, 10, 40],
        lookAt: [0, 30, 0],
      }
    });
    document.getElementById('renderer-root')!.prepend(renderer.domElement);
    
    for (let i = 0; i < cubes; i++) {
      physics.create.box(() => ({
        type: BodyType.DYNAMIC,
        args: [1, 1, 1],
        position: [Math.random() * 10 - 5, Math.floor(i / 10) * 3, Math.random() * 10 - 5],
        mass: 1,
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

Heap.args = {
  cubes: 100,
};
