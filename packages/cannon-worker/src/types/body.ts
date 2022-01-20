import type { MaterialOptions } from 'cannon-es';
import { Euler, Vector3 } from 'three';
import type { CollideEvent, CollideBeginEvent, CollideEndEvent } from './cannon-events';
import type { Triplet } from './vec';

const atomicNames = [
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

export type AtomicProps = {
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

  /**
   * Body user data
   */
  userData: any;
};

const vectorNames = [
  'angularFactor',
  'angularVelocity',
  'linearFactor',
  'position',
  'quaternion',
  'velocity',
] as const;
export type VectorName = typeof vectorNames[number];
export type VectorTypes = Vector3 | Triplet;
type VectorProps = Record<PublicVectorName, Triplet>;

const subscriptionNames = [...atomicNames, ...vectorNames, 'sliding'] as const;
export type SubscriptionName = typeof subscriptionNames[number];

type PublicVectorName = Exclude<VectorName, 'quaternion'> | 'rotation';

export enum BodyType {
  DYNAMIC = 'Dynamic',
  STATIC = 'Static',
  KINEMATIC = 'Kinematic',
}

export type BodyProps = Partial<AtomicProps> &
  Partial<VectorProps> & {
    type?: `${BodyType}`;
    onCollide?: (e: CollideEvent) => void;
    onCollideBegin?: (e: CollideBeginEvent) => void;
    onCollideEnd?: (e: CollideEndEvent) => void;
  };

export type ExtendsBodyProps<B extends BodyProps = BodyProps> = B;

export type SerializableBodyProps = Omit<BodyProps, `onCollide`> & { onCollide: boolean };

type AtomicApi = {
  [K in AtomicName]: {
    set: (value: AtomicProps[K]) => void;
    subscribe: (callback: (value: AtomicProps[K]) => void) => () => void;
  };
};

type VectorApi = {
  [K in PublicVectorName]: {
    set: (x: number, y: number, z: number) => void;
    copy: ({ x, y, z }: Vector3 | Euler) => void;
    subscribe: (callback: (value: Triplet) => void) => () => void;
  };
};

export type SingleBodyApi = AtomicApi &
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

export type BodyApi = SingleBodyApi & {
  at: (index: number) => SingleBodyApi;
};
