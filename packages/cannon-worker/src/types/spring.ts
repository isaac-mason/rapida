import { Object3D } from 'three';
import { Triplet } from './vec';

export interface SpringProps {
  restLength?: number;
  stiffness?: number;
  damping?: number;
  worldAnchorA?: Triplet;
  worldAnchorB?: Triplet;
  localAnchorA?: Triplet;
  localAnchorB?: Triplet;
}

export type SpringApi = {
  uuid: string; // uuid
  bodyA: Object3D;
  bodyB: Object3D;
  api: {
    setStiffness: (value: number) => void;
    setRestLength: (value: number) => void;
    setDamping: (value: number) => void;
  };
};
