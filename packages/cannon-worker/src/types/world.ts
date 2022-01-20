import { Triplet } from './vec';

export enum Broadphase {
  NAIVE = 'Naive',
  SAP = 'SAP',
}

export enum Solver {
  GS = 'GS',
  SPLIT = 'Split',
}

export type PhysicsWorldConfig = {
  tolerance: number;
  iterations: number;
  allowSleep: boolean;
  broadphase: Broadphase;
  gravity: Triplet;
  quatNormalizeFast: boolean;
  quatNormalizeSkip: number;
  solver: 'GS' | 'Split';
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

export type WorldPropName = 'axisIndex' | 'broadphase' | 'gravity' | 'iterations' | 'tolerance';
