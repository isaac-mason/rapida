import { Object3D, Vector3, Euler } from 'three';
import { ConstraintTypes } from './constraint';
import { AtomicName, AtomicParams, PublicVectorName, Triplet } from './atomic';

export type Api = { ref: Object3D; api: BodyApi };
export type AtomicApi = {
  [K in AtomicName]: {
    set: (value: AtomicParams[K]) => void;
    subscribe: (callback: (value: AtomicParams[K]) => void) => () => void;
  };
};

export type VectorApi = {
  [K in PublicVectorName]: {
    set: (x: number, y: number, z: number) => void;
    copy: ({ x, y, z }: Vector3 | Euler) => void;
    subscribe: (callback: (value: Triplet) => void) => () => void;
  };
};

export type WorkerApi = AtomicApi &
  VectorApi & {
    applyForce: (force: Triplet, worldPoint: Triplet) => void;
    applyImpulse: (impulse: Triplet, worldPoint: Triplet) => void;
    applyLocalForce: (force: Triplet, localPoint: Triplet) => void;
    applyLocalImpulse: (impulse: Triplet, localPoint: Triplet) => void;
    applyTorque: (torque: Triplet) => void;
    wakeUp: () => void;
    sleep: () => void;
    destroy: () => void;
  };

export interface BodyApi extends WorkerApi {
  at: (index: number) => WorkerApi;
}

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
export type ConstraintORHingeApi<T extends 'Hinge' | ConstraintTypes> = T extends ConstraintTypes
  ? ConstraintApi
  : HingeConstraintApi;

export interface RaycastVehiclePublicApi {
  applyEngineForce: (value: number, wheelIndex: number) => void;
  setBrake: (brake: number, wheelIndex: number) => void;
  setSteeringValue: (value: number, wheelIndex: number) => void;
  sliding: {
    subscribe: (callback: (sliding: boolean) => void) => void;
  };
}
