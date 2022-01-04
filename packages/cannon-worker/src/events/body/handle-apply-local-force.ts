import { Vec3 } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyLocalForceEvent = {
  topic: PhysicsEventTopic.APPLY_LOCAL_FORCE;
  uuid: string;
  params: [[number, number, number], [number, number, number]];
};

export const handleApplyLocalForce = (e: ApplyLocalForceEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyLocalForce(new Vec3(...params[0]), new Vec3(...params[1]));
};
