import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetCollisionFilterGroupEvent = {
  topic: PhysicsEventTopic.SET_COLLISION_FILTER_GROUP;
  uuid: string;
  params: number;
};

export const handleSetCollisionFilterGroup = (e: SetCollisionFilterGroupEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionFilterGroup = params;
};
