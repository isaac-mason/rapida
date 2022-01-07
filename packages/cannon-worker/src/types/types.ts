import { RayOptions, Shape } from 'cannon-es';
import { Object3D } from 'three';
import { PhysicsEventTopic } from '../events/physics-event-topic';
import { WheelInfoOptions } from './raycast-vehicle';
import type { BodyParams, BodyShapeType } from './body';
import type { SpringOptns } from './spring';
import { ConstraintTypes } from './constraint';
import { SubscriptionName, AtomicName, AtomicParams, VectorName, Triplet } from './atomic';
import { PhysicsWorldConfig } from './world';

export type Buffers = { positions: Float32Array; quaternions: Float32Array };

export type Refs = { [uuid: string]: Object3D };

type WorkerContact = WorkerCollideEvent['data']['contact'];

export type CollideEvent = Omit<WorkerCollideEvent['data'], 'body' | 'target' | 'contact'> & {
  topic: PhysicsEventTopic.COLLIDE;
  body: Object3D;
  target: Object3D;
  contact: Omit<WorkerContact, 'bi' | 'bj'> & {
    bi: Object3D;
    bj: Object3D;
  };
};

export type CollideBeginEvent = {
  topic: PhysicsEventTopic.COLLIDE_BEGIN;
  target: Object3D;
  body: Object3D;
};

export type CollideEndEvent = {
  topic: PhysicsEventTopic.COLLIDE_END;
  target: Object3D;
  body: Object3D;
};

export type RayhitEvent = Omit<WorkerRayhitEvent['data'], 'body'> & {
  body: Object3D | null;
  topic: PhysicsEventTopic.RAYHIT;
};

type CannonEvent = CollideBeginEvent | CollideEndEvent | CollideEvent | RayhitEvent;

type CallbackByTopic<T extends { topic: string }> = {
  [K in T['topic']]?: T extends { topic: K } ? (e: T) => void : never;
};

type CannonEvents = { [uuid: string]: Partial<CallbackByTopic<CannonEvent>> };

export type Subscription = Partial<{ [K in SubscriptionName]: (value: PropValue<K>) => void }>;
export type Subscriptions = Partial<{
  [id: number]: Subscription;
}>;

export type PropValue<T extends SubscriptionName = SubscriptionName> = T extends AtomicName
  ? AtomicParams[T]
  : T extends VectorName
  ? Triplet
  : T extends 'sliding'
  ? boolean
  : never;

export type SetOpName<T extends AtomicName | VectorName | WorldPropName> = `set${Capitalize<T>}`;

type Operation<T extends string, P> = { topic: T } & (P extends void ? any : { params: P });
type WithUUID<T extends string, P = void> = Operation<T, P> & { uuid: string };
type WithUUIDs<T extends string, P = void> = Operation<T, P> & { uuid: string[] };

type AddConstraintMessage = WithUUID<'addConstraint', [uuidA: string, uuidB: string, options: any]> & {
  type: 'Hinge' | ConstraintTypes;
};

type DisableConstraintMessage = WithUUID<'disableConstraint'>;
type EnableConstraintMessage = WithUUID<'enableConstraint'>;
type RemoveConstraintMessage = WithUUID<'removeConstraint'>;

type ConstraintMessage =
  | AddConstraintMessage
  | DisableConstraintMessage
  | EnableConstraintMessage
  | RemoveConstraintMessage;

type DisableConstraintMotorMessage = WithUUID<'disableConstraintMotor'>;
type EnableConstraintMotorMessage = WithUUID<'enableConstraintMotor'>;
type SetConstraintMotorMaxForce = WithUUID<'setConstraintMotorMaxForce', number>;
type SetConstraintMotorSpeed = WithUUID<'setConstraintMotorSpeed', number>;

type ConstraintMotorMessage =
  | DisableConstraintMotorMessage
  | EnableConstraintMotorMessage
  | SetConstraintMotorSpeed
  | SetConstraintMotorMaxForce;

type AddSpringMessage = WithUUID<'addSpring', [uuidA: string, uuidB: string, options: SpringOptns]>;
type RemoveSpringMessage = WithUUID<'removeSpring'>;

type SetSpringDampingMessage = WithUUID<'setSpringDamping', number>;
type SetSpringRestLengthMessage = WithUUID<'setSpringRestLength', number>;
type SetSpringStiffnessMessage = WithUUID<'setSpringStiffness', number>;

type SpringMessage =
  | AddSpringMessage
  | RemoveSpringMessage
  | SetSpringDampingMessage
  | SetSpringRestLengthMessage
  | SetSpringStiffnessMessage;

export type RayMode = 'Closest' | 'Any' | 'All';

export type RayHookOptions = Omit<AddRayMessage['params'], 'mode'>;

export type AddRayMessage = WithUUID<
  'addRay',
  {
    from?: Triplet;
    mode: RayMode;
    to?: Triplet;
  } & Pick<
    RayOptions,
    'checkCollisionResponse' | 'collisionFilterGroup' | 'collisionFilterMask' | 'skipBackfaces'
  >
>;
type RemoveRayMessage = WithUUID<'removeRay'>;

type RayMessage = AddRayMessage | RemoveRayMessage;

type AddRaycastVehicleMessage = WithUUIDs<
  'addRaycastVehicle',
  [
    chassisBodyUUID: string,
    wheelsUUID: string[],
    wheelInfos: WheelInfoOptions[],
    indexForwardAxis: number,
    indexRightAxis: number,
    indexUpAxis: number,
  ]
>;
type RemoveRaycastVehicleMessage = WithUUIDs<'removeRaycastVehicle'>;

type ApplyRaycastVehicleEngineForceMessage = WithUUID<
  'applyRaycastVehicleEngineForce',
  [value: number, wheelIndex: number]
>;
type SetRaycastVehicleBrakeMessage = WithUUID<'setRaycastVehicleBrake', [brake: number, wheelIndex: number]>;
type SetRaycastVehicleSteeringValueMessage = WithUUID<
  'setRaycastVehicleSteeringValue',
  [value: number, wheelIndex: number]
>;

type RaycastVehicleMessage =
  | AddRaycastVehicleMessage
  | ApplyRaycastVehicleEngineForceMessage
  | RemoveRaycastVehicleMessage
  | SetRaycastVehicleBrakeMessage
  | SetRaycastVehicleSteeringValueMessage;

type AtomicMessage = WithUUID<SetOpName<AtomicName>, any>;
type VectorMessage = WithUUID<SetOpName<VectorName>, Triplet>;

type ApplyForceMessage = WithUUID<'applyForce', [force: Triplet, worldPoint: Triplet]>;
type ApplyImpulseMessage = WithUUID<'applyImpulse', [impulse: Triplet, worldPoint: Triplet]>;
type ApplyLocalForceMessage = WithUUID<'applyLocalForce', [force: Triplet, localPoint: Triplet]>;
type ApplyLocalImpulseMessage = WithUUID<'applyLocalImpulse', [impulse: Triplet, localPoint: Triplet]>;
type ApplyTorque = WithUUID<'applyTorque', [torque: Triplet]>;

type ApplyMessage =
  | ApplyForceMessage
  | ApplyImpulseMessage
  | ApplyLocalForceMessage
  | ApplyLocalImpulseMessage
  | ApplyTorque;

export type SerializableBodyParams = Omit<BodyParams<unknown>, `onCollide`> & { onCollide: true };

type AddBodiesMessage = WithUUIDs<'addBodies', SerializableBodyParams[]> & { type: BodyShapeType };
type RemoveBodiesMessage = WithUUIDs<'removeBodies'>;

type BodiesMessage = AddBodiesMessage | RemoveBodiesMessage;

type SleepMessage = WithUUID<'sleep'>;
type WakeUpMessage = WithUUID<'wakeUp'>;

export type SubscriptionTarget = 'bodies' | 'vehicles';

type SubscribeMessage = WithUUID<
  'subscribe',
  {
    id: number;
    target: SubscriptionTarget;
    type: SubscriptionName;
  }
>;
type UnsubscribeMessage = Operation<'unsubscribe', number>;

type SubscriptionMessage = SubscribeMessage | UnsubscribeMessage;

export type WorldPropName = 'axisIndex' | 'broadphase' | 'gravity' | 'iterations' | 'tolerance';

type WorldMessage<T extends WorldPropName> = Operation<SetOpName<T>, Required<PhysicsWorldConfig[T]>>;

type CannonMessage =
  | ApplyMessage
  | AtomicMessage
  | BodiesMessage
  | ConstraintMessage
  | ConstraintMotorMessage
  | RaycastVehicleMessage
  | RayMessage
  | SleepMessage
  | SpringMessage
  | SubscriptionMessage
  | VectorMessage
  | WakeUpMessage
  | WorldMessage<WorldPropName>;

export interface CannonWorker extends Worker {
  postMessage: (message: CannonMessage) => void;
}

export type PhysicsContext = {
  worker: CannonWorker;
  bodies: { [uuid: string]: number };
  buffers: Buffers;
  refs: Refs;
  events: CannonEvents;
  subscriptions: Subscriptions;
};

export type DebugApi = {
  add(id: string, params: BodyParams, type: BodyShapeType): void;
  remove(id: string): void;
  update(): void;
};

export type Observation = { [K in AtomicName]: [id: number, value: PropValue<K>, type: K] }[AtomicName];

export type FrameMessage = {
  topic: PhysicsEventTopic.FRAME;
  positions: Float32Array;
  quaternions: Float32Array;
  observations: Observation[];
  active: boolean;
  bodies?: string[];
  origin?: number;
};

export type WorkerFrameMessage = {
  topic: PhysicsEventTopic.FRAME;
  data: FrameMessage;
};

export type WorkerCollideEvent = {
  data: {
    topic: PhysicsEventTopic.COLLIDE;
    target: string;
    body: string;
    contact: {
      id: string;
      ni: number[];
      ri: number[];
      rj: number[];
      impactVelocity: number;
      bi: string;
      bj: string;
      /** Contact point in world space */
      contactPoint: number[];
      /** Normal of the contact, relative to the colliding body */
      contactNormal: number[];
    };
    collisionFilters: {
      bodyFilterGroup: number;
      bodyFilterMask: number;
      targetFilterGroup: number;
      targetFilterMask: number;
    };
  };
};

export type WorkerRayhitEvent = {
  data: {
    topic: PhysicsEventTopic.RAYHIT;
    ray: {
      from: number[];
      to: number[];
      direction: number[];
      collisionFilterGroup: number;
      collisionFilterMask: number;
      uuid: string;
    };
    hasHit: boolean;
    body: string | null;
    shape: (Omit<Shape, 'body'> & { body: string }) | null;
    rayFromWorld: number[];
    rayToWorld: number[];
    hitNormalWorld: number[];
    hitPointWorld: number[];
    hitFaceIndex: number;
    distance: number;
    shouldStop: boolean;
  };
};

export type WorkerCollideBeginEvent = {
  data: {
    topic: PhysicsEventTopic.COLLIDE_BEGIN;
    bodyA: string;
    bodyB: string;
  };
};
export type WorkerCollideEndEvent = {
  data: {
    topic: PhysicsEventTopic.COLLIDE_END;
    bodyA: string;
    bodyB: string;
  };
};
export type WorkerEventMessage =
  | WorkerCollideEvent
  | WorkerRayhitEvent
  | WorkerCollideBeginEvent
  | WorkerCollideEndEvent;
export type IncomingWorkerMessage = WorkerFrameMessage | WorkerEventMessage;
