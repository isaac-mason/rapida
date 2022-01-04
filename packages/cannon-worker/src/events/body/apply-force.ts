import { Vec3 } from 'cannon-es';
import { Triplet } from '../../types';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyForceEvent = {
  topic: PhysicsEventTopic.APPLY_FORCE;
  uuid: string;
  params: [Triplet, Triplet];
};

export const handleApplyForce = (e: ApplyForceEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyForce(new Vec3(...params[0]), new Vec3(...params[1]));
};
