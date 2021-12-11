import { Vec3 } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyLocalImpulseEvent = {
  topic: PhysicsEventTopic.APPLY_LOCAL_IMPULSE;
  uuid: string;
  params: [[number, number, number], [number, number, number]];
};

export const handleApplyLocalImpulse = (e: ApplyLocalImpulseEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyLocalImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};
