import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetCollisionFilterMaskEvent = {
  topic: PhysicsEventTopic.SET_COLLISION_FILTER_MASK;
  uuid: string;
  params: number;
};

export const handleSetCollisionFilterMask = (e: SetCollisionFilterMaskEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionFilterMask = params;
};
