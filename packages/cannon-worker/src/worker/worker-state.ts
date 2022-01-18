import { Vec3, World } from 'cannon-es';
import { Body, RaycastVehicle, Spring } from '../cannon';
import type { SubscriptionTarget } from './managers/subscription-manager';

/**
 * WorkerState contains the state of the web worker running the cannon world
 */
export class WorkerState {
  /**
   * The cannon world
   */
  world!: World;

  /**
   * The cannon world step config
   */
  config: { delta: number; maxSubSteps: number } = { delta: 1 / 60, maxSubSteps: 5 };

  /**
   * Cannon bodies in the world
   */
  bodies: { [id: string]: Body } = {};

  /**
   * Whether bodies need syncing for the next frame
   */
  bodiesNeedSyncing = false;

  /**
   * Raycast vehicles in the world
   */
  vehicles: { [id: string]: RaycastVehicle } = {};

  /**
   * Spring callbacks
   */
  springs: { [id: string]: () => void } = {};

  /**
   * Spring instances in the world
   */
  springInstances: { [id: string]: Spring } = {};

  /**
   * Subscriptions in the world
   *
   * [0] - the uuid
   * [1] - the property of the object to get
   * [2] - the subscription target
   */
  subscriptions: Map<string, [string, string, SubscriptionTarget]> = new Map();

  /**
   * A temp vec3 for avoiding object creation
   */
  tempVector: Vec3 = new Vec3();
}
