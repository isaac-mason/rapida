import { Vec3 } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyImpulseEvent = {
  topic: PhysicsEventTopic.APPLY_IMPULSE;
  uuid: string;
  params: [[number, number, number], [number, number, number]];
};

export const handleApplyImpulse = (e: ApplyImpulseEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};
