import { MaterialOptions } from 'cannon-es';
import { Vector3 } from 'three';

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
