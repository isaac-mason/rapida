import { Object3D } from 'three';
import { Triplet } from './vec';

export enum ConstraintType {
  PointToPoint = 'PointToPoint',
  ConeTwist = 'ConeTwist',
  Distance = 'Distance',
  Lock = 'Lock',
  Hinge = 'Hinge', // ?
}

export type ConstraintProps = {
  maxForce?: number;
  collideConnected?: boolean;
  wakeUpBodies?: boolean;
};

export type PointToPointConstraintProps = ConstraintProps & {
  pivotA: Triplet;
  pivotB: Triplet;
};

export type ConeTwistConstraintProps = ConstraintProps & {
  pivotA?: Triplet;
  axisA?: Triplet;
  pivotB?: Triplet;
  axisB?: Triplet;
  angle?: number;
  twistAngle?: number;
};

export type DistanceConstraintProps = ConstraintProps & {
  distance?: number;
};

export type HingeConstraintProps = ConstraintProps & {
  pivotA?: Triplet;
  axisA?: Triplet;
  pivotB?: Triplet;
  axisB?: Triplet;
};

export type LockConstraintProps = ConstraintProps;

export type ConstraintApi = {
  bodyA: Object3D;
  bodyB: Object3D;
  api: {
    enable: () => void;
    disable: () => void;
  };
};

export type HingeConstraintApi = {
  bodyA: Object3D;
  bodyB: Object3D;
  api: {
    enable: () => void;
    disable: () => void;
    enableMotor: () => void;
    disableMotor: () => void;
    setMotorSpeed: (value: number) => void;
    setMotorMaxForce: (value: number) => void;
  };
};

export type ConstraintORHingeApi<T extends `${ConstraintType}`> = `${T}` extends `${ConstraintType.Hinge}`
  ? HingeConstraintApi
  : ConstraintApi;
