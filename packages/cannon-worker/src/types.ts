import { MaterialOptions, RayOptions, Shape } from 'cannon-es';
import { Euler, Object3D, Vector3 } from 'three';
import { PhysicsEventTopic } from './events/physics-event-topic';

export type Triplet = [x: number, y: number, z: number];
export type VectorTypes = Vector3 | Triplet;
export type VectorParams = Record<PublicVectorName, Triplet>;

export const atomicNames = [
  'allowSleep',
  'angularDamping',
  'collisionFilterGroup',
  'collisionFilterMask',
  'collisionResponse',
  'fixedRotation',
  'isTrigger',
  'linearDamping',
  'mass',
  'material',
  'sleepSpeedLimit',
  'sleepTimeLimit',
  'userData',
] as const;
export type AtomicName = typeof atomicNames[number];

export const vectorNames = [
  'angularFactor',
  'angularVelocity',
  'linearFactor',
  'position',
  'quaternion',
  'velocity',
] as const;
export type VectorName = typeof vectorNames[number];

export const subscriptionNames = [...atomicNames, ...vectorNames, 'sliding'] as const;
export type SubscriptionName = typeof subscriptionNames[number];

export type PublicVectorName = Exclude<VectorName, 'quaternion'> | 'rotation';

export type Api = { ref: Object3D; api: PhysicsObjectApi };

export type AtomicParams = {
  /**
   * If true, the body will automatically fall to sleep.
   */
  allowSleep: boolean;

  /**
   * How much to damp the body angular velocity each step. It can go from 0 to 1.
   */
  angularDamping: number;

  /**
   * The collision group the body belongs to.
   */
  collisionFilterGroup: number;

  /**
   * The collision group the body can collide with.
   */
  collisionFilterMask: number;

  /**
   * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled - i.e. "collide" events will be raised, but forces will not be altered.
   */
  collisionResponse: number;

  /**
   * Set to true if you don't want the body to rotate
   */
  fixedRotation: boolean;

  /**
   * When true the body behaves like a trigger. It does not collide
   * with other bodies but collision events are still triggered.
   */
  isTrigger: boolean;

  /**
   * How much to damp the body velocity each step. It can go from 0 to 1.
   */
  linearDamping: number;

  /**
   * The mass of the body
   */
  mass: number;

  /**
   * The material for the body
   */
  material: MaterialOptions;

  /**
   * If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
   */
  sleepSpeedLimit: number;

  /**
   * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
   */
  sleepTimeLimit: number;

  userData: any;
};

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

export interface PhysicsObjectApi extends WorkerApi {
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

export type ConstraintTypes = 'PointToPoint' | 'ConeTwist' | 'Distance' | 'Lock';

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

export type SerializableBodyParams = {
  onCollide: boolean;
};

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

export type Broadphase = 'Naive' | 'SAP';

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

export enum BodyType {
  DYNAMIC = 'Dynamic',
  STATIC = 'Static',
  KINEMATIC = 'Kinematic',
}

export type BodyParams<T = unknown> = Partial<AtomicParams> &
  Partial<VectorParams> & {
    args?: T;
    type?: BodyType;
    onCollide?: (e: CollideEvent) => void;
    onCollideBegin?: (e: CollideBeginEvent) => void;
    onCollideEnd?: (e: CollideEndEvent) => void;
  };

export type BodyParamsArgsRequired<T = unknown> = BodyParams<T> & {
  args: T;
};

export type ShapeType =
  | 'Plane'
  | 'Box'
  | 'Cylinder'
  | 'Heightfield'
  | 'Particle'
  | 'Sphere'
  | 'Trimesh'
  | 'ConvexPolyhedron';
export type BodyShapeType = ShapeType | 'Compound';

export type CylinderArgs = [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number];

export type TrimeshArgs = [vertices: ArrayLike<number>, indices: ArrayLike<number>];

export type HeightfieldArgs = [
  data: number[][],
  options: { elementSize?: number; maxValue?: number; minValue?: number },
];

export type ConvexPolyhedronArgs<V extends VectorTypes = VectorTypes> = [
  vertices?: V[],
  faces?: number[][],
  normals?: V[],
  axes?: V[],
  boundingSphereRadius?: number,
];

export type PlaneParams = BodyParams;

export type BoxParams = BodyParams<Triplet>;

export type CylinderParams = BodyParams<CylinderArgs>;

export type ParticleParams = BodyParams;

export type SphereParams = BodyParams<number>;

export type TrimeshParams = BodyParamsArgsRequired<TrimeshArgs>;
export type HeightfieldParams = BodyParamsArgsRequired<HeightfieldArgs>;
export type ConvexPolyhedronParams = BodyParams<ConvexPolyhedronArgs>;
export interface CompoundBodyParams extends BodyParams {
  shapes: BodyParams & { type: ShapeType }[];
}

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

export interface SpringOptns {
  restLength?: number;
  stiffness?: number;
  damping?: number;
  worldAnchorA?: Triplet;
  worldAnchorB?: Triplet;
  localAnchorA?: Triplet;
  localAnchorB?: Triplet;
}

export interface WheelInfoOptions {
  radius?: number;
  directionLocal?: Triplet;
  suspensionStiffness?: number;
  suspensionRestLength?: number;
  maxSuspensionForce?: number;
  maxSuspensionTravel?: number;
  dampingRelaxation?: number;
  dampingCompression?: number;
  sideAcceleration?: number;
  frictionSlip?: number;
  rollInfluence?: number;
  axleLocal?: Triplet;
  chassisConnectionPointLocal?: Triplet;
  isFrontWheel?: boolean;
  useCustomSlidingRotationalSpeed?: boolean;
  customSlidingRotationalSpeed?: number;
}

export interface RaycastVehicleParams {
  chassisBody: Object3D;
  wheels: Object3D[];
  wheelInfos: WheelInfoOptions[];
  indexForwardAxis?: number;
  indexRightAxis?: number;
  indexUpAxis?: number;
}

export type DefaultContactMaterial = {
  friction?: number;
  restitution?: number;
  contactEquationStiffness?: number;
  contactEquationRelaxation?: number;
  frictionEquationStiffness?: number;
  frictionEquationRelaxation?: number;
};

export type PhysicsParams = {
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
