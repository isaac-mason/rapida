import { Triplet } from './atomic';

export interface SpringOptns {
  restLength?: number;
  stiffness?: number;
  damping?: number;
  worldAnchorA?: Triplet;
  worldAnchorB?: Triplet;
  localAnchorA?: Triplet;
  localAnchorB?: Triplet;
}
