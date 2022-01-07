import { DefaultContactMaterial } from './contact-material';
import { Triplet } from './atomic';

export type Broadphase = 'Naive' | 'SAP';

export type CannonPhysicsParams = {
  /**
   * An optional id for the physics world
   */
  id?: string;
  tolerance?: number;
  iterations?: number;
  allowSleep?: boolean;
  broadphase?: Broadphase;
  gravity?: Triplet;
  quatNormalizeFast?: boolean;
  quatNormalizeSkip?: number;
  solver?: 'GS' | 'Split';
  axisIndex?: number;
  defaultContactMaterial?: DefaultContactMaterial;
  size?: number;
  maxSubSteps?: number;
  delta?: number;
};

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
