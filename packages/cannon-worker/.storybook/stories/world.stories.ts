import { useEffect } from '@storybook/client-api';
import { BodyType, Broadphase, CannonWorkerProps, Solver } from '../../lib';
import { createDebuggerSetup } from './utils/create-debugger-setup';

export default {
  title: 'World Props',
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

export const WorldProps = ({ config }: { config: CannonWorkerProps }) => {
  useEffect(() => {
    const { renderer, physics, start, destroy } = createDebuggerSetup({
      cannonWorkerProps: config,
    });
    document.getElementById('renderer-root')!.prepend(renderer.domElement);

    for (let i = 0; i < 5; i++) {
      const x = i % 2 === 0 ? 0.2 : -0.1;
      const y = 2 * i;
      const z = i % 2 === 0 ? 0.3 : -0.2;

      physics.create.box(() => ({
        type: BodyType.DYNAMIC,
        args: [1, 1, 1],
        position: [x, y, z],
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

WorldProps.args = {
  config: {
    allowSleep: true,
    tolerance: 0.001,
    iterations: 1000,
    broadphase: Broadphase.SAP,
    gravity: [0, -10, 0],
    quatNormalizeFast: true,
    quatNormalizeSkip: 8,
    solver: Solver.SPLIT,
    axisIndex: 1,
    defaultContactMaterial: {
      friction: 0.3,
      restitution: 0.3,
      contactEquationStiffness: 1e7,
      contactEquationRelaxation: 3,
      frictionEquationStiffness: 1e7,
      frictionEquationRelaxation: 3,
    },
    size: 100,
    maxSubSteps: 5,
    delta: 1 / 60,
  },
} as CannonWorkerProps;
