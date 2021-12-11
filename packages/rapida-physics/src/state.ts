import { Body, Vec3, RaycastVehicle, Spring, World } from 'cannon-es';

export class State {
  bodies: { [id: string]: Body } = {};

  vehicles: { [id: string]: RaycastVehicle } = {};

  springs: { [id: string]: () => void } = {};

  springInstances: { [id: string]: Spring } = {};

  rays: { [id: string]: () => void } = {};

  _world: World | undefined = undefined;

  get world(): World {
    return this._world as World;
  }

  subscriptions: { [id: string]: [string, string, string] } = {};

  tempVector: Vec3 = new Vec3();

  bodiesNeedSyncing = false;

  config: { delta: number; maxSubSteps: number } = { delta: 1 / 60, maxSubSteps: 5 };
}
