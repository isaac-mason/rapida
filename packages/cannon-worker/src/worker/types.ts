import { Broadphase, Solver, Triplet } from '../types';

export type PhysicsWorldConfig = {
  tolerance: number;
  iterations: number;
  allowSleep: boolean;
  broadphase: `${Broadphase}`;
  gravity: Triplet;
  quatNormalizeFast: boolean;
  quatNormalizeSkip: number;
  solver: `${Solver}`;
  axisIndex: number;
  defaultContactMaterial: {
    friction?: number;
    restitution?: number;
    contactEquationStiffness?: number;
    contactEquationRelaxation?: number;
    frictionEquationStiffness?: number;
    frictionEquationRelaxation?: number;
  };
  size: number;
  maxSubSteps: number;
  delta: number;
};
