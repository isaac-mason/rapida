import { Triplet } from './atomic';

export type ConstraintTypes = 'PointToPoint' | 'ConeTwist' | 'Distance' | 'Lock';

export interface ConstraintOptns {
  maxForce?: number;
  collideConnected?: boolean;
  wakeUpBodies?: boolean;
}

export interface PointToPointConstraintOpts extends ConstraintOptns {
  pivotA: Triplet;
  pivotB: Triplet;
}

export interface ConeTwistConstraintOpts extends ConstraintOptns {
  pivotA?: Triplet;
  axisA?: Triplet;
  pivotB?: Triplet;
  axisB?: Triplet;
  angle?: number;
  twistAngle?: number;
}
export interface DistanceConstraintOpts extends ConstraintOptns {
  distance?: number;
}

export interface HingeConstraintOpts extends ConstraintOptns {
  pivotA?: Triplet;
  axisA?: Triplet;
  pivotB?: Triplet;
  axisB?: Triplet;
}

export type LockConstraintOpts = ConstraintOptns;
